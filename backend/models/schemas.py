from pydantic import BaseModel, Field


class GigWorkerInput(BaseModel):
    name: str
    city: str
    work_type: str
    platform: str
    monthly_income: float = Field(..., ge=0)
    work_days_per_month: int = Field(..., ge=0, le=31)
    monthly_jobs: int = Field(..., ge=0)
    rating: float = Field(..., ge=0, le=5)
    cancellation_rate: float = Field(..., ge=0, le=100)
    payment_consistency: float = Field(..., ge=0, le=100)


class MSMEInput(BaseModel):
    business_name: str
    owner_name: str
    business_type: str
    monthly_revenue: float = Field(..., ge=0)
    monthly_expenses: float = Field(..., ge=0)
    years_in_business: float = Field(..., ge=0)
    transaction_consistency: float = Field(..., ge=0, le=100)
    supplier_discipline: float = Field(..., ge=0, le=100)
    invoice_timeliness: float = Field(..., ge=0, le=100)
    loan_burden: float = Field(..., ge=0, le=100)