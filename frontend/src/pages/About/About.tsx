export function About() {
  return (
    <div>
      <h1>About</h1>
      <p>
        This site was made with Vite + React 19 + TypeScript + Node + Express + Google Cloud
        Platform.
      </p>

      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Technology</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Front-End Framework</td>
            <td>React 19 + TypeScript</td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <td>Back-End Framework</td>
            <td>Node.js + Express</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Deployment Platform</td>
            <td>Google Cloud Run</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Database</td>
            <td>Google Cloud SQL (Postgres)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
