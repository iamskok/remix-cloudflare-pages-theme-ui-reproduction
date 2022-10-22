import { Button } from 'theme-ui'

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 sx={{
        color: 'primary'
      }}>Welcome to Remix</h1>
      <ul>
        <li>
          <Button variant='primary'>Primary</Button>
        </li>
        <li>
          <Button variant='secondary'>Secondary</Button>
        </li>
      </ul>
    </div>
  );
}
