def calculate_msme_score(data: dict) -> dict:
    score = 0

    # --- Monthly revenue (max 25 pts) ---
    revenue = data.get("monthly_revenue", 0)
    if revenue >= 500000:
        score += 25
    elif revenue >= 200000:
        score += 19
    elif revenue >= 100000:
        score += 13
    elif revenue >= 50000:
        score += 7
    else:
        score += 3

    # --- Profit margin (max 20 pts) ---
    expenses = data.get("monthly_expenses", 0)
    margin = ((revenue - expenses) / revenue * 100) if revenue > 0 else 0
    if margin >= 35:
        score += 20
    elif margin >= 25:
        score += 15
    elif margin >= 15:
        score += 10
    elif margin >= 5:
        score += 5
    else:
        score += 0

    # --- Years in business (max 15 pts) ---
    years = data.get("years_in_business", 0)
    if years >= 5:
        score += 15
    elif years >= 3:
        score += 11
    elif years >= 1:
        score += 6
    else:
        score += 2

    # --- Transaction consistency (max 15 pts) ---
    tx = data.get("transaction_consistency", 0)
    if tx >= 90:
        score += 15
    elif tx >= 75:
        score += 11
    elif tx >= 60:
        score += 7
    elif tx >= 40:
        score += 3
    else:
        score += 0

    # --- Supplier discipline (max 10 pts) ---
    supplier = data.get("supplier_discipline", 0)
    if supplier >= 90:
        score += 10
    elif supplier >= 70:
        score += 7
    elif supplier >= 50:
        score += 4
    else:
        score += 1

    # --- Invoice timeliness (max 10 pts) ---
    invoice = data.get("invoice_timeliness", 0)
    if invoice >= 90:
        score += 10
    elif invoice >= 70:
        score += 7
    elif invoice >= 50:
        score += 4
    else:
        score += 1

    # --- Loan burden penalty (up to -5 pts) ---
    loan = data.get("loan_burden", 0)
    if loan > 60:
        score -= 5
    elif loan > 40:
        score -= 3
    elif loan > 20:
        score -= 1

    score = max(0, min(score, 100))

    # --- Forecast ---
    if score >= 75:
        forecast = "Improving"
    elif score >= 50:
        forecast = "Stable"
    else:
        forecast = "Declining"

    # --- Confidence ---
    if score >= 70:
        confidence = "High"
    elif score >= 45:
        confidence = "Medium"
    else:
        confidence = "Low"

    # --- Eligible opportunities ---
    opportunities = []
    if score >= 75:
        opportunities.append({
            "title": "Working Capital Loan up to ₹25,00,000",
            "partner": "Lendingkart / Indifi",
            "match": 91,
        })
        opportunities.append({
            "title": "Business Credit Card",
            "partner": "HDFC SmartHub / ICICI iMobile",
            "match": 86,
        })
    if score >= 55:
        opportunities.append({
            "title": "MSME Loan up to ₹5,00,000",
            "partner": "Udyam / Razorpay Capital",
            "match": 80,
        })
        opportunities.append({
            "title": "Invoice Financing",
            "partner": "KredX / M1xchange",
            "match": 75,
        })
    if score >= 40:
        opportunities.append({
            "title": "Mudra Loan (Kishore) up to ₹5,00,000",
            "partner": "SBI / Bank of Baroda",
            "match": 68,
        })
    if score < 40:
        opportunities.append({
            "title": "Mudra Loan (Shishu) up to ₹50,000",
            "partner": "Microfinance Institutions",
            "match": 58,
        })

    # --- Breakdown for Gemini context ---
    breakdown = {
        "monthly_revenue": revenue,
        "monthly_expenses": expenses,
        "profit_margin_pct": round(margin, 1),
        "years_in_business": years,
        "transaction_consistency": tx,
        "supplier_discipline": supplier,
        "invoice_timeliness": invoice,
        "loan_burden": loan,
    }

    return {
        "trust_score": score,
        "forecast": forecast,
        "confidence": confidence,
        "opportunities": opportunities,
        "breakdown": breakdown,
    }