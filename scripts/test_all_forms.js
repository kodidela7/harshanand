const http = require('http');

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('RUNNING FULL END-TO-END AUDIT ON ALL FORMS AND APIS');
  console.log('====================================================\n');

  let results = [];

  // 1. Test Public Contact Submission (Contact Page)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      name: 'Test Citizen Public',
      phone: '9845012345',
      email: 'citizen@example.com',
      location: 'Aland City',
      message: 'Automated test message from public contact form.',
      source: 'contact_page',
    });
    results.push({
      form: '1. Public Contact Form (/contact -> /api/contact)',
      status: res.status === 200 && res.data.success ? 'PASSED' : 'FAILED',
      details: res.data,
    });
  } catch (e) {
    results.push({ form: '1. Public Contact Form', status: 'ERROR', details: e.message });
  }

  // 2. Test Farmers Page Inquiry Submission
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      name: 'Ramesh Patil (Farmer)',
      phone: '7075781963',
      location: 'Nimbal Village, Aland',
      message: 'Testing farmer tur dal export advisory and soil test consultation.',
      source: 'farmers_page',
    });
    results.push({
      form: '2. Farmers Inquiry Form (/farmers -> /api/contact)',
      status: res.status === 200 && res.data.success ? 'PASSED' : 'FAILED',
      details: res.data,
    });
  } catch (e) {
    results.push({ form: '2. Farmers Inquiry Form', status: 'ERROR', details: e.message });
  }

  // 3. Test Footer Newsletter Subscription
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/contact',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      name: 'Newsletter Subscriber',
      phone: '9999999999',
      email: 'newsletter.test@example.com',
      location: 'Kalaburagi',
      message: 'Constituency Newsletter Subscription: newsletter.test@example.com',
      source: 'newsletter',
    });
    results.push({
      form: '3. Footer Newsletter Form (/components/Footer -> /api/contact)',
      status: res.status === 200 && res.data.success ? 'PASSED' : 'FAILED',
      details: res.data,
    });
  } catch (e) {
    results.push({ form: '3. Footer Newsletter Form', status: 'ERROR', details: e.message });
  }

  // 4. Test Grievance Submission & Tracking
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/concerns',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      citizen_name: 'Sharanappa Gouda',
      mobile: '7075781963',
      village_name: 'Madan Hipparga',
      taluk: 'Aland',
      pincode: '585302',
      category: 'Roads & Infrastructure',
      urgency: 'high',
      title: 'Road connectivity improvement near primary school',
      description: 'The school approach road requires asphalt and pothole filling.',
    });

    let trackingPassed = false;
    if (res.status === 200 && res.data.tracking_id) {
      // Test Tracking query
      const trackRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: `/api/concerns?tracking_id=${res.data.tracking_id}`,
        method: 'GET',
      });
      trackingPassed = trackRes.status === 200 && trackRes.data.success;
    }

    results.push({
      form: '4. Grievance Form & Tracking (/portal -> /api/concerns)',
      status: res.status === 200 && res.data.success && trackingPassed ? 'PASSED' : 'FAILED',
      details: { submission: res.data, trackingPassed },
    });
  } catch (e) {
    results.push({ form: '4. Grievance Form & Tracking', status: 'ERROR', details: e.message });
  }

  // 5. Test Live Events API (Public GET)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/events?limit=4&status=upcoming',
      method: 'GET',
    });
    results.push({
      form: '5. Events API (Public GET /api/events)',
      status: res.status === 200 && res.data.success ? 'PASSED' : 'FAILED',
      count: res.data.events ? res.data.events.length : 0,
    });
  } catch (e) {
    results.push({ form: '5. Events API', status: 'ERROR', details: e.message });
  }

  // 6. Test Live Articles API (Public GET)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/articles?limit=3&status=published',
      method: 'GET',
    });
    results.push({
      form: '6. Articles API (Public GET /api/articles)',
      status: res.status === 200 && res.data.success ? 'PASSED' : 'FAILED',
      count: res.data.articles ? res.data.articles.length : 0,
    });
  } catch (e) {
    results.push({ form: '6. Articles API', status: 'ERROR', details: e.message });
  }

  // 7. Test Admin Auth Protection on Contact API (Should reject unauthorized)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/contact',
      method: 'GET',
    });
    results.push({
      form: '7. Admin Contact API Auth Protection (GET /api/admin/contact)',
      status: (res.status === 401 || res.status === 403) ? 'PASSED' : `FAILED (Expected 401/403, got ${res.status})`,
      statusCode: res.status,
    });
  } catch (e) {
    results.push({ form: '7. Admin Contact API Auth Protection', status: 'ERROR', details: e.message });
  }

  // 8. Test Admin Events Auth Protection (POST /api/admin/events)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/events',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      title_en: 'Unauthorized Event',
    });
    results.push({
      form: '8. Admin Events Auth Protection (POST /api/admin/events)',
      status: (res.status === 401 || res.status === 403) ? 'PASSED' : `FAILED (Expected 401/403, got ${res.status})`,
      statusCode: res.status,
    });
  } catch (e) {
    results.push({ form: '8. Admin Events Auth Protection', status: 'ERROR', details: e.message });
  }

  // 9. Test Admin Articles Auth Protection (POST /api/admin/articles)
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/admin/articles',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      title_en: 'Unauthorized Article',
    });
    results.push({
      form: '9. Admin Articles Auth Protection (POST /api/admin/articles)',
      status: (res.status === 401 || res.status === 403) ? 'PASSED' : `FAILED (Expected 401/403, got ${res.status})`,
      statusCode: res.status,
    });
  } catch (e) {
    results.push({ form: '9. Admin Articles Auth Protection', status: 'ERROR', details: e.message });
  }

  // Print results
  console.log(JSON.stringify(results, null, 2));
  const allPassed = results.every(r => r.status === 'PASSED');
  console.log('\nFINAL AUDIT VERDICT:', allPassed ? 'ALL SYSTEMS OPERATIONAL (100% PASSED)' : 'SOME TESTS FAILED');
}

runTests();
