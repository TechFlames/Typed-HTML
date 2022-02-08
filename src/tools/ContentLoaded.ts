// @ts-ignore
await (
  async function ContentLoaded(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (document.readyState !== "loading")
      return;

    return await ContentLoaded();
  }
)();