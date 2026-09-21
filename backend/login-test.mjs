import readline from 'node:readline';
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.question('Enter admin password: ', async (password) => {
  const response = await fetch('http://127.0.0.1:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'primelanemotors2@gmail.com',
      password
    })
  });

  const data = await response.json();

  console.log('HTTP status:', response.status);
  console.log('Success:', data.success);
  console.log('Message:', data.message);
  console.log(
    'Access token received:',
    Boolean(data?.data?.tokens?.accessToken)
  );

  rl.close();
});
