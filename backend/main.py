from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import GigWorkerInput, MSMEInput
from scoring.gig_score import calculate_gig_score
from scoring.msme_score import calculate_msme_score
from ai.explainer import explain_gig_score, explain_msme_score
from ai.upi_analyzer import analyze_upi_statement

app = FastAPI(
    title="PRISM API",
    description="Alternative credit scoring for gig workers and MSMEs",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your Vercel URL before final submission
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "PRISM API is running", "version": "1.0.0"}


@app.post("/api/gig-score")
def gig_score(data: GigWorkerInput):
    """
    Score a gig worker and return trust score, forecast,
    opportunities, and a Gemini-generated explanation + plan.
    """
    input_dict = data.dict()

    # Step 1: deterministic scoring
    result = calculate_gig_score(input_dict)

    # Step 2: Gemini explanation + improvement plan
    ai_output = explain_gig_score(input_dict, result)

    return {
        "trust_score": result["trust_score"],
        "forecast": result["forecast"],
        "confidence": result["confidence"],
        "opportunities": result["opportunities"],
        "trust_signals": result["trust_signals"],
        "score_explanation": ai_output.get("score_explanation", ""),
        "improvement_plan": ai_output.get("improvement_plan", []),
        "summary_headline": ai_output.get("summary_headline", ""),
        "breakdown": result["breakdown"],
    }


@app.post("/api/msme-score")
def msme_score(data: MSMEInput):
    """
    Score an MSME business and return trust score, forecast,
    opportunities, and a Gemini-generated explanation + plan.
    """
    input_dict = data.dict()

    # Step 1: deterministic scoring
    result = calculate_msme_score(input_dict)

    # Step 2: Gemini explanation + improvement plan
    ai_output = explain_msme_score(input_dict, result)

    return {
        "trust_score": result["trust_score"],
        "forecast": result["forecast"],
        "confidence": result["confidence"],
        "opportunities": result["opportunities"],
        "score_explanation": ai_output.get("score_explanation", ""),
        "improvement_plan": ai_output.get("improvement_plan", []),
        "summary_headline": ai_output.get("summary_headline", ""),
        "breakdown": result["breakdown"],
    }


@app.post("/api/parse-upi/gig")
async def parse_upi_gig(file: UploadFile = File(...)):
    """
    Parse a 30-day UPI statement for a gig worker.
    Returns transaction signals that can be used to augment the score.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")

    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=400, detail="File size must be under 10MB.")

    result = analyze_upi_statement(contents, user_type="gig")
    return result


@app.post("/api/parse-upi/msme")
async def parse_upi_msme(file: UploadFile = File(...)):
    """
    Parse a 30-day UPI/transaction statement for an MSME.
    Returns business cash flow signals.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")

    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size must be under 10MB.")

    result = analyze_upi_statement(contents, user_type="msme")
    return result