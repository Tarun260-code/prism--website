def calculate_gig_score(data: dict) -> dict:
    score = 0

    # --- Income signal (max 25 pts) ---
    income = data.get("monthly_income", 0)
    if income >= 40000:
        score += 25
    elif income >= 25000:
        score += 18
    elif income >= 15000:
        score += 11
    elif income >= 8000:
        score += 6
    else:
        score += 2

    # --- Platform rating (max 20 pts) ---
    rating = data.get("rating", 0)
    if rating >= 4.8:
        score += 20
    elif rating >= 4.5:
        score += 16
    elif rating >= 4.0:
        score += 11
    elif rating >= 3.5:
        score += 6
    else:
        score += 2

    # --- Cancellation rate (max 20 pts, lower = better) ---
    cancel = data.get("cancellation_rate", 100)
    if cancel <= 3:
        score += 20
    elif cancel <= 8:
        score += 15
    elif cancel <= 15:
        score += 9
    elif cancel <= 25:
        score += 4
    else:
        score += 0

    # --- Work days consistency (max 15 pts) ---
    days = data.get("work_days_per_month", 0)
    if days >= 24:
        score += 15
    elif days >= 18:
        score += 11
    elif days >= 12:
        score += 7
    elif days >= 6:
        score += 3
    else:
        score += 0

    # --- Payment consistency (max 10 pts) ---
    consistency = data.get("payment_consistency", 0)
    if consistency >= 90:
        score += 10
    elif consistency >= 75:
        score += 7
    elif consistency >= 60:
        score += 4
    else:
        score += 1

    # --- Monthly jobs volume (max 10 pts) ---
    jobs = data.get("monthly_jobs", 0)
    if jobs >= 80:
        score += 10
    elif jobs >= 50:
        score += 7
    elif jobs >= 25:
        score += 4
    elif jobs >= 10:
        score += 2
    else:
        score += 0

    score = min(score, 100)

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
            "title": "Personal Loan up to ₹1,50,000",
            "partner": "KreditBee / MoneyTap",
            "match": 92,
        })
        opportunities.append({
            "title": "Credit Card (entry-level)",
            "partner": "Slice / OneCard",
            "match": 85,
        })
    if score >= 60:
        opportunities.append({
            "title": "Microloan up to ₹50,000",
            "partner": "PaySense / EarlySalary",
            "match": 78,
        })
        opportunities.append({
            "title": "Gig Worker Insurance",
            "partner": "HDFC Ergo / Acko",
            "match": 90,
        })
    if score >= 40:
        opportunities.append({
            "title": "Emergency Credit Line ₹15,000",
            "partner": "Navi / StashFin",
            "match": 65,
        })
    if score < 40:
        opportunities.append({
            "title": "Starter Credit Line ₹10,000",
            "partner": "Freo / Uni Cards",
            "match": 55,
        })

    # --- Trust signals ---
    trust_signals = []
    if rating >= 4.5:
        trust_signals.append("High platform rating — strong reliability signal")
    if cancel <= 5:
        trust_signals.append("Very low cancellation rate — consistent service")
    if days >= 20:
        trust_signals.append("Active work schedule — income regularity confirmed")
    if income >= 25000:
        trust_signals.append("Above-average income for gig segment")
    if consistency >= 80:
        trust_signals.append("Consistent payment receipts — low financial irregularity")
    if jobs >= 50:
        trust_signals.append("High job volume — platform dependency is stable")

    # --- Raw breakdown for Gemini context ---
    breakdown = {
        "income_score": min(25, score),
        "rating_score": rating,
        "cancellation_rate": cancel,
        "work_days": days,
        "payment_consistency": consistency,
        "monthly_jobs": jobs,
    }

    return {
        "trust_score": score,
        "forecast": forecast,
        "confidence": confidence,
        "opportunities": opportunities,
        "trust_signals": trust_signals,
        "breakdown": breakdown,
    }