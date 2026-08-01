export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        height: "100vh",
        background: "red",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "40px",
      }}
    >
      PASSWORD GATE WORKS
    </div>
  );
}
