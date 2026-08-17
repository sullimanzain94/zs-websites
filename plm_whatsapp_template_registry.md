# PLM WhatsApp Template Governance

| Template ID | Name | Purpose | Message Content | Dynamic Fields |
| :--- | :--- | :--- | :--- | :--- |
| `WS_NEW_LEAD` | First Contact | Initial greeting for new enquiry | "Hi {{first_name}}, I'm {{salesperson_name}} from Prime Lane Motors. I've received your enquiry regarding the {{vehicle}}. Are you still interested in finding out more about this vehicle?" | `first_name`, `salesperson_name`, `vehicle` |
| `WS_NO_ANSWER` | No Answer | Gentle follow-up after no response | "Hi {{first_name}}, just following up on my previous message. Let me know if you'd still like to chat about the {{vehicle}} when you're free. No rush! — {{salesperson_name}}" | `first_name`, `vehicle`, `salesperson_name` |
| `WS_INTERESTED` | Interested | Moving toward application | "Great to hear from you, {{first_name}}! To help get the ball rolling, shall we start the finance qualification for the {{vehicle}}? It only takes a few minutes. {{next_action}}" | `first_name`, `vehicle`, `next_action` |
| `WS_VEHICLE` | Vehicle Enquiry | Stock-specific information | "Hi {{first_name}}, regarding the {{vehicle}} (Ref: {{stock_reference}}), I can confirm it is currently available. Would you like to see more photos or start a finance enquiry? — {{salesperson_name}}" | `first_name`, `vehicle`, `stock_reference`, `salesperson_name` |
| `WS_FINANCE` | Finance Enquiry | Process assistance | "Hi {{first_name}}, I see you're interested in financing the {{vehicle}}. I'm here to assist you with the process every step of the way. When would be a good time for a quick 2-minute chat? — {{salesperson_name}}" | `first_name`, `vehicle`, `salesperson_name` |
| `WS_APP_START` | Application Started | Abandonment recovery | "Hi {{first_name}}, I noticed you started your finance application for the {{vehicle}} but didn't quite finish. Is there anything I can help you with to get it across the line? — {{salesperson_name}}" | `first_name`, `vehicle`, `salesperson_name` |
| `WS_DOCS` | Docs Outstanding | Document reminder | "Hi {{first_name}}, we're almost there! We just need {{next_action}} to proceed with your application for the {{vehicle}}. You can send it right here or via email. — {{salesperson_name}}" | `first_name`, `next_action`, `vehicle`, `salesperson_name` |
| `WS_NURTURE` | Customer Not Ready | Long-term engagement | "Understood, {{first_name}}. I'll keep an eye out for similar VW options and check in with you in a few weeks. Feel free to reach out if your timing changes! — {{salesperson_name}}" | `first_name`, `salesperson_name` |
| `WS_CLOSED` | Lost / Declined | Respectful closing | "Hi {{first_name}}, thank you for considering Prime Lane Motors. While we couldn't proceed this time, please feel free to contact us again if your circumstances change in the future. All the best! — {{salesperson_name}}" | `first_name`, `salesperson_name` |

## Communication Principles
- **Professional & Friendly**: Maintain the premium PLM brand voice.
- **Dynamic Personalisation**: Always use placeholders to ensure relevance.
- **No Pressure**: Focus on assistance, not "closing" at any cost.
- **Compliance**: Never promise "guaranteed" approval or specific rates in templates.
