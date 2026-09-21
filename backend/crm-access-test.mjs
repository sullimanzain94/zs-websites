const password = await new Promise(resolve => {
  process.stdout.write('Enter admin password: ');
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', data => resolve(data.trim()));
});

const login = await fetch('http://127.0.0.1:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'primelanemotors2@gmail.com',
    password
  })
});

const loginData = await login.json();

if (!loginData.success) {
  console.log('Login failed:', loginData.message);
  process.exit(1);
}

const token = loginData.data.tokens.accessToken;

const leads = await fetch('http://127.0.0.1:3000/api/leads', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const leadsData = await leads.json();

console.log('Login status:', login.status);
console.log('Leads API status:', leads.status);
console.log('Leads API success:', leadsData.success);
console.log(
  'Live leads returned:',
  Array.isArray(leadsData.data) ? leadsData.data.length : 'unexpected response'
);
