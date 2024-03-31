import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req, res) {
    const body = await req.json();

    const { htmlContent } = body;
    console.log(htmlContent)
    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(htmlContent);

        const screenshot = await page.screenshot({ encoding: 'base64' });

        await browser.close();
        console.log("home")
        return NextResponse.json({ messgae: "done", screenshot: screenshot })
    }
    catch (e) {
        console.log(e)
    }
}