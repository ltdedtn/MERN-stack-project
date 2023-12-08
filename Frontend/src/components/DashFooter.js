const DashFooter = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  const content = (
    <footer className="footer-center sticky top-[100vh]">
      <p>Current User:</p>
      <p>Status:</p>
      <p>{today}</p>
    </footer>
  );
  return content;
};
export default DashFooter;
