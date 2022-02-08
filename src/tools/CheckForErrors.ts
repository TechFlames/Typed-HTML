(function CheckForErrors() {
  const url: URL = new URL(window.location.href);

  const type: string | null | undefined = url.searchParams.get("err_type")?.toUpperCase(),
    name: string | null = url.searchParams.get("err_name");

  if (!name || !type) return;

  url.searchParams.delete("err_type");
  url.searchParams.delete("err_name");

  window.history.replaceState({}, "", url.href);
  alert(`${ErrorHandler[type](type, name)}`);
})();
