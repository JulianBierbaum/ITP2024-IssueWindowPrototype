from datetime import datetime
from pydantic import BaseModel


class Issue(BaseModel):
    issue_type = str
    title = str
    # task = report_time = null
    report_time = datetime.date
    # bug = task_point = null
    task_point = int


class IssueSchema(Issue):
    id = int
