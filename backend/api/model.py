from datetime import datetime
from pydantic import BaseModel


class Issue(BaseModel):
    issue_type = str
    title = str
    report_time = datetime.date
    task_point = int


class IssueSchema(Issue):
    id = int
