import asyncio
from playwright.async_api import async_playwright

async def verify_frontend():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("http://localhost:8000/index.html")

        # Type search query
        search_input = page.locator("#searchInput")
        await search_input.fill("VPN")

        # Wait for debounce
        await asyncio.sleep(0.5)

        # Take screenshot of the search results
        await page.screenshot(path="verification/search_results.png")
        print("Screenshot saved to verification/search_results.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_frontend())
