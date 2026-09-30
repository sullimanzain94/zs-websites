# Prime Lane Motors — Security and Access Policy

## 1. Purpose

This document defines the basic security and access rules for people contributing to Prime Lane Motors (PLM).

The objective is to allow collaboration while reducing unnecessary exposure of PLM systems, credentials, customer information and business data.

---

## 2. Least Privilege

PLM uses the principle of least privilege.

Each contributor receives only the access required to perform their assigned work.

Access should be:

- Necessary
- Limited
- Reviewable
- Revocable

---

## 3. Repository Access

Repository permissions should be based on the contributor's role.

Possible access levels include:

- No repository access
- Read access
- Issue participation
- Development access
- Maintainer-level access

Broader permissions should require a legitimate project reason.

---

## 4. Production Access

Production access is restricted.

Contributors should not receive production credentials simply because they contribute to development.

Where possible, contributors should work with:

- Local development environments
- Test environments
- Sanitized data
- Mock services
- Non-production credentials

---

## 5. Secrets

The following must never be committed to Git:

- Passwords
- API keys
- Access tokens
- Database passwords
- Private keys
- `.env` files containing secrets
- Production credentials
- Authentication secrets

If a secret is exposed:

1. Stop using the exposed secret.
2. Notify PLM.
3. Rotate or revoke the credential.
4. Remove the secret from the affected system where appropriate.
5. Investigate whether it was accessed.

---

## 6. Customer Information

Customer information must be treated as confidential.

Examples include:

- Names
- Phone numbers
- Email addresses
- Physical addresses
- Identity information
- Employment information
- Income information
- Finance information
- Vehicle information linked to a customer
- Private communications

Real customer information should not be copied into development environments unless specifically authorized and appropriately protected.

---

## 7. Finance Information

Finance-related information requires additional care.

Contributors should not request, download, copy or expose customer financial information unless their assigned role specifically requires access and PLM has authorized it.

---

## 8. Third-Party Services

Before connecting a new external service to PLM, contributors should document:

- Service name
- Purpose
- Data being transferred
- Credentials required
- Permissions required
- Security considerations
- Cost implications
- Removal procedure

Unapproved external integrations should not be connected to production.

---

## 9. Access Review

Contributor access should be reviewed when:

- A contributor changes roles
- A project ends
- A contributor becomes inactive
- A contributor no longer needs access
- A security concern occurs
- Production responsibilities change

Access should be removed when it is no longer required.

---

## 10. Security Reporting

Potential security issues should be reported immediately.

Examples:

- Exposed credentials
- Unexpected database access
- Unauthorized account access
- Suspicious repository changes
- Customer data exposure
- Authentication weaknesses
- Unexpected production behaviour

Security concerns should not be publicly disclosed before PLM has had an opportunity to assess them.

---

## 11. Contributor Responsibility

Access to PLM systems is provided for legitimate project work.

Contributors must not:

- Attempt to access unrelated systems
- Search for information they do not need
- Copy confidential information
- Share credentials
- Bypass access controls
- Disable security controls without authorization
- Make unauthorized production changes

---

## 12. PLM Responsibility

PLM should:

- Limit access
- Review permissions
- Protect secrets
- Maintain appropriate backups
- Monitor important production systems
- Remove unnecessary access
- Document significant security incidents

---

## Security Principle

Access is provided to enable contribution, not ownership of the underlying systems or data.
