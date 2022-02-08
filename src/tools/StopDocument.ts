function StopDocument(type: string, name: string): void {
  let url = new URL(window.location.href);

  url.searchParams.set("err_type", type.toLowerCase());
  url.searchParams.set("err_name", name);

  window.location.replace(url.href);
};