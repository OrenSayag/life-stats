import strings from "../assets/strings";

export default function NotFound() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-primary`}
    >
      {strings.notFound}
    </main>
  );
}
