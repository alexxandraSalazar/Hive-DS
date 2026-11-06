import { Button } from '@alexxandraSalazar/hive-ui';

export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Hive Design System Docs</h1>
      <p>🐝💛</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    </main>
  );
}
