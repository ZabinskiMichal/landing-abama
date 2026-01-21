/**
 * GOOGLE APPS SCRIPT - LEADS FORM HANDLER
 *
 * Handles:
 * - CORS preflight (doOptions)
 * - POST JSON submissions (doPost)
 * - Validation and basic anti-spam
 * - Appends data to the "Leads" sheet
 */

const SHEET_NAME = 'Leads';
const REQUIRED_FIELDS = ['name', 'email'];
const FIELD_ORDER = [
  'name',
  'email',
  'phone',
  'company',
  'message',
  'consent',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term'
];

function doOptions() {
  return buildCorsResponse({ ok: true });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return buildCorsResponse({ ok: false, error: 'Missing request body.' });
    }

    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return buildCorsResponse({ ok: false, error: 'Invalid JSON payload.' });
    }

    const validationError = validatePayload(payload);
    if (validationError) {
      return buildCorsResponse({ ok: false, error: validationError });
    }

    if (payload.website && String(payload.website).trim() !== '') {
      return buildCorsResponse({ ok: false, error: 'Spam detected.' });
    }

    const rateLimitError = checkRateLimit(payload.email);
    if (rateLimitError) {
      return buildCorsResponse({ ok: false, error: rateLimitError });
    }

    const sheet = getOrCreateSheet();
    ensureHeaders(sheet);

    const row = buildRow(payload);
    sheet.appendRow(row);

    return buildCorsResponse({ ok: true });
  } catch (error) {
    Logger.log('Server error: ' + error.toString());
    return buildCorsResponse({ ok: false, error: 'Server error.' });
  }
}

function validatePayload(payload) {
  for (var i = 0; i < REQUIRED_FIELDS.length; i += 1) {
    var field = REQUIRED_FIELDS[i];
    if (!payload[field] || String(payload[field]).trim() === '') {
      return 'Missing required field: ' + field + '.';
    }
  }

  var email = String(payload.email).trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email address.';
  }

  return '';
}

function checkRateLimit(email) {
  var cache = CacheService.getScriptCache();
  var cacheKey = 'lead_email_' + String(email).trim().toLowerCase();
  var existing = cache.get(cacheKey);

  if (existing) {
    return 'Too many submissions. Please wait and try again.';
  }

  cache.put(cacheKey, '1', 60);
  return '';
}

function getOrCreateSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  var headers = ['timestamp'].concat(FIELD_ORDER);
  sheet.appendRow(headers);
}

function buildRow(payload) {
  var row = [new Date().toISOString()];

  for (var i = 0; i < FIELD_ORDER.length; i += 1) {
    var field = FIELD_ORDER[i];
    if (field === 'consent') {
      row.push(Boolean(payload.consent));
    } else {
      row.push(payload[field] ? String(payload[field]) : '');
    }
  }

  return row;
}

function buildCorsResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
