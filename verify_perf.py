import asyncio
from playwright.async_api import async_playwright
import subprocess
import time
import os

async def verify_page(page, url, search_term, expected_visible):
    print(f"\n--- Checking {url} ---")
    await page.goto(f"http://localhost:8001/{url}")
    await page.wait_for_timeout(1000) # Wait for initial render and index build

    # Check initial count
    initial_count_text = await page.locator("#gameCount").text_content()
    print(f"Initial game count text: {initial_count_text}")

    # Check search
    search_input = page.locator("#searchInput")
    await search_input.fill(search_term)
    await page.wait_for_timeout(500) # Wait for debounce (250ms) + buffer

    game_cards = page.locator(".game-card")
    count = await game_cards.count()
    visible_count = 0
    for i in range(count):
        if await game_cards.nth(i).is_visible():
            visible_count += 1
    print(f"Visible cards for '{search_term}': {visible_count}")

    # Check count text after search
    game_count_text = await page.locator("#gameCount").text_content()
    print(f"Game count text after search: {game_count_text}")

    assert visible_count == expected_visible, f"Expected {expected_visible} visible cards, but got {visible_count}"
    assert str(visible_count) in game_count_text, f"Stats text '{game_count_text}' does not match visible count {visible_count}"

    # Check "No results"
    await search_input.fill("nonexistentgame123")
    await page.wait_for_timeout(500)
    no_results = page.locator("#noResultsMessage")
    assert await no_results.is_visible(), "No results message should be visible"
    print("Confirmed 'No results' message is visible for invalid search.")

async def verify():
    # Start local server
    server = subprocess.Popen(["python3", "-m", "http.server", "8001"])
    time.sleep(2) # Wait for server to start

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()

            await verify_page(page, "Game_page.html", "Grand Theft Auto", 1)
            await verify_page(page, "Game_page_2.html", "Hogwarts", 1)

            await browser.close()
    finally:
        server.terminate()

if __name__ == "__main__":
    asyncio.run(verify())
