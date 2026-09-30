# Prime Lane Motors — Development Workflow

## Standard Workflow

PLM uses the following development lifecycle:

Issue
→ Planning
→ Branch
→ Development
→ Testing
→ Pull Request
→ Review
→ Approval
→ Merge
→ Deployment
→ Monitoring

---

## 1. Issue

Every meaningful task should begin with a GitHub Issue.

The Issue defines the problem and expected outcome.

---

## 2. Planning

Before development begins:

- Confirm the scope.
- Identify dependencies.
- Identify affected systems.
- Define acceptance criteria.
- Identify risks.

---

## 3. Branch

Create a dedicated branch from the appropriate base branch.

Examples:

feature/customer-location

feature/lead-scoring

fix/api-authentication

docs/collaboration-policy

---

## 4. Development

Make only the changes required for the task.

Avoid unrelated refactoring unless it is explicitly approved.

---

## 5. Testing

Run the relevant tests.

Record testing results.

If testing cannot be completed, explain why in the Pull Request.

---

## 6. Pull Request

Push the branch and open a Pull Request.

The Pull Request should identify:

- Related Issue
- Changes made
- Testing
- Risks
- Limitations
- Deployment requirements

---

## 7. Review

PLM reviews the proposed change.

Review may cover:

- Correctness
- Security
- Architecture
- Maintainability
- User experience
- Regression risk
- Testing
- Scope

Changes may be requested before approval.

---

## 8. Approval

Approval confirms that the proposed change is acceptable for integration.

Approval does not automatically mean that production deployment is complete.

---

## 9. Merge

Approved changes are merged through the repository's controlled process.

Direct changes to the protected production branch should not be the normal contributor workflow.

---

## 10. Deployment

Deployment should follow the project's approved deployment process.

Production changes should be traceable to an approved change.

---

## 11. Monitoring

After deployment, verify:

- Application health
- Relevant functionality
- API behaviour
- Database behaviour
- Authentication
- Error logs
- User-facing behaviour

---

## 12. Rollback

If a deployment causes a serious problem:

1. Identify the affected change.
2. Stop further deployment where appropriate.
3. Restore the last known-good state or apply an approved fix.
4. Document the incident.
5. Investigate the cause.
6. Correct the underlying problem.

---

## 13. Emergency Changes

Emergency changes may require a shortened workflow when necessary to protect PLM systems or users.

The change should still be documented and reviewed retrospectively.

---

## 14. Definition of Done

A task is considered complete when:

- Acceptance criteria are satisfied.
- Relevant testing is completed.
- Documentation is updated where required.
- Pull Request review is complete.
- Approved changes are merged.
- Deployment requirements are satisfied.
- Production behaviour is verified where applicable.

---

## Workflow Principle

No unexplained production changes.

Every meaningful change should be traceable from requirement to implementation to review.
