import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def explain_gig_score(data: dict, result: dict) -> dict:
    prompt = f"""
You are PRISM, an AI financial credibility engine for gig workers in India.

A gig worker has just been scored. Here is their profile and result:

Name: {data.get("name")}
City: {data.get("city")}
Platform: {data.get("platform")}
Work Type: {data.get("work_type")}
Monthly Income: ₹{data.get("monthly_income")}
Work Days/Month: {data.get("work_days_per_month")}
Monthly Jobs: {data.get("monthly_jobs")}
Platform Rating: {data.get("rating")}/5
Cancellation Rate: {data.get("cancellation_rate")}%
Payment Consistency: {data.get("payment_consistency")}%

PRISM Trust Score: {result.get("trust_score")}/100
Forecast: {result.get("forecast")}
Confidence: {result.get("confidence")}

Your tasks:
1. Write a "score_explanation": 3 sentences in plain, warm language explaining WHY this person got this score. Be specific about their signals. Do not use jargon.
2. Write an "improvement_plan": a list of exactly 4 specific, actionable steps this person can take to improve their PRISM score over the next 90 days. Each step must be one sentence, practical, and tied to a specific behavior.
3. Write a "summary_headline": a single bold sentence (max 12 words) that captures this person's financial credibility profile.

Respond ONLY in this exact JSON format with no markdown, no extra text:
{{
  "score_explanation": "...",
  "improvement_plan": ["step1", "step2", "step3", "step4"],
  "summary_headline": "..."
}}
"""
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        text = response.text.strip()
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
        return json.loads(text.strip())
    except Exception:
        return {
            "score_explanation": f"Your PRISM Trust Score of {result.get('trust_score')}/100 reflects your current platform performance and income patterns.",
            "improvement_plan": [
                "Maintain a platform rating above 4.5 for 60 consecutive days.",
                "Reduce your cancellation rate to below 5% this month.",
                "Work at least 20 days per month to signal income consistency.",
                "Enable UPI autopay for recurring bills to improve payment consistency.",
            ],
            "summary_headline": "A consistent worker with room to grow financially.",
        }


def explain_msme_score(data: dict, result: dict) -> dict:
    margin = result.get("breakdown", {}).get("profit_margin_pct", 0)

    prompt = f"""
You are PRISM, an AI financial credibility engine for MSMEs and small businesses in India.

A business owner has just been scored. Here is their profile:

Business Name: {data.get("business_name")}
Owner: {data.get("owner_name")}
Business Type: {data.get("business_type")}
Monthly Revenue: ₹{data.get("monthly_revenue")}
Monthly Expenses: ₹{data.get("monthly_expenses")}
Profit Margin: {margin}%
Years in Business: {data.get("years_in_business")}
Transaction Consistency: {data.get("transaction_consistency")}%
Supplier Discipline: {data.get("supplier_discipline")}%
Invoice Timeliness: {data.get("invoice_timeliness")}%
Current Loan Burden: {data.get("loan_burden")}%

PRISM Trust Score: {result.get("trust_score")}/100
Forecast: {result.get("forecast")}
Confidence: {result.get("confidence")}

Your tasks:
1. Write a "score_explanation": 3 sentences in plain, warm language explaining WHY this business got this score. Reference specific signals like margin, consistency, or years in operation.
2. Write an "improvement_plan": a list of exactly 4 specific, actionable steps this business owner can take in the next 90 days to improve their PRISM score. Each step must be one sentence and tied to a measurable behavior.
3. Write a "summary_headline": a single bold sentence (max 12 words) capturing this business's financial credibility.

Respond ONLY in this exact JSON format with no markdown, no extra text:
{{
  "score_explanation": "...",
  "improvement_plan": ["step1", "step2", "step3", "step4"],
  "summary_headline": "..."
}}
"""
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        text = response.text.strip()
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
        return json.loads(text.strip())
    except Exception:
        return {
            "score_explanation": f"Your PRISM Trust Score of {result.get('trust_score')}/100 reflects your business's revenue patterns and operational discipline.",
            "improvement_plan": [
                "Maintain transaction consistency above 85% for the next 60 days.",
                "Clear all pending supplier payments within 30 days.",
                "Reduce monthly expenses by 10% to improve your profit margin.",
                "Ensure all invoices are collected within 30 days of issuance.",
            ],
            "summary_headline": "A growing business with strong fundamentals and clear upside.",
        }