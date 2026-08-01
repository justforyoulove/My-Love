import { useState } from "react";

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [password, setPassword] = useState("");
  const [allowed, setAllowed] = useState(false);

  const correctPassword = "26309";

  if (allowed) return <>{children}</>;

  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        gap: "20px",
      }}
    >
      <h1>❤️ Welcome, My Love ❤️</h1>

      <p>Only one person knows the key to this little world.</p>

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "10px",
          width: "280px",
        }}
      />

      <button
        onClick={() => {
          if (password === correctPassword) {
            setAllowed(true);
          } else {
            alert("Oops... that's not the key to my heart ❤️");
          }
        }}
      >
        Enter
      </button>
    </div>
  );
}
