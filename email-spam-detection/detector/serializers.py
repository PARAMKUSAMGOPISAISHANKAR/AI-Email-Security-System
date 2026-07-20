from __future__ import annotations

from typing import Any


def serialize_scan(result: dict[str, Any]) -> dict[str, Any]:
    return {
        "prediction": result.get("prediction", "safe"),
        "confidence": result.get("confidence", 0),
        "risk_level": result.get("risk_level", "Low"),
        "reasons": result.get("reasons", []),
        "subject": result.get("subject", "Untitled email"),
        "snippet": result.get("snippet", ""),
    }
