# Task 2: Billing Widget Review

Since this is a static mock-up, some technical behaviors cannot be confirmed and would need to be verified in the working application.

## a. Problems Identified

1. **Functional / Globalization: International billing addresses are not properly supported**

   The form does not include a Country field. The label says “State or Province,” but the dropdown says “Select a state,” and the Postal Code field instructs users not to enter dashes.

   Customers from countries with different address structures or postal-code formats may be unable to complete the payment.

2. **Functional / Usability: The payment currency is missing**

   The amount is displayed only as `30.00`, without a currency symbol or code.

   The customer cannot know whether the charge is in USD, EUR, GBP, or another currency.

3. **Security / Functional: No CVV or CVC field is displayed**

   The form includes a card number and expiration date but does not include a security-code field.

   A CVV or CVC is commonly used as an additional verification value in online card payments.

4. **Functional / Usability: Card Type is selected manually**

   The customer must select the card brand separately, and the supported brands are not clearly displayed.

   The system should detect the card brand automatically or verify that the selected type matches the entered card number.

5. **Usability: Some fields are unclear**

   The abbreviation “MI” may not be understood by all users, and the second address field has no label.

   “MI” should be written as “Middle Initial” and marked as optional. The second address field should be labeled “Address Line 2” or “Apartment / Suite.”

6. **Usability: The form requires unnecessary manual formatting**

   The customer is instructed to enter the card number without spaces or dashes and the postal code without dashes.

   The form should accept common formats and normalize the values automatically.

7. **Usability / Reliability: Continue and Cancel behavior is unclear**

   The buttons are visible, but the mock-up does not explain what happens after either action.

   Continue should display a processing state and prevent repeated submissions. Cancel should return the customer to the correct screen and warn them if entered information will be discarded.

8. **Security Risk Requiring Verification: Card-data handling is unclear**

   The mock-up does not show whether card details are collected through secure hosted fields, tokenized, masked after entry, or protected from appearing in URLs and logs.

   This cannot be confirmed from the image and should be verified in the working application.

## b. Sample Test Cases

### 1. International Billing Address

I would test the form with a valid billing address from outside the United States.

I would expect the user to be able to select a country, the address fields to adapt to that country, and valid international postal-code formats to be accepted. The payment amount should also display a clear currency before submission.

This test covers the missing Country field, the US-oriented state selector, the postal-code restriction, and the missing currency.

### 2. Card Details and Validation

I would test the form with valid card details and then repeat the flow with an invalid card number, an expired card, a missing CVV, and a card type that does not match the entered number.

I would expect valid details to be accepted and invalid details to be blocked before any payment request is sent. Clear errors should appear next to the relevant fields, and the card brand should be detected automatically or validated against the selected type.

This test covers the missing CVV, manual Card Type selection, supported card brands, and card validation.

### 3. Continue and Cancel Behavior

I would complete the form and test both available actions. I would also click Continue several times quickly to check that repeated submissions are prevented.

I would expect Continue to display a processing state, create only one payment request, and move the user to a clear confirmation screen. Cancel should stop the payment process and return the user to the appropriate screen. If entered information will be discarded, the user should receive a confirmation message first.

This test covers the Continue and Cancel behavior and the risk of duplicate payment submissions.

## c. Proposed Product Solution

The most severe confirmed issue is the lack of proper support for international billing addresses.

The company is described as global, but the form does not allow the customer to select a country and uses address rules that appear to be designed mainly for the United States. This may prevent international customers from completing checkout and can directly affect revenue.

I would replace the current address section with a country-aware billing form. The customer would select a country first, and the remaining fields would adapt to that selection.

The improved form should:

1. Display State, Province, Region, or County according to the selected country.
2. Accept country-specific postal-code formats, including letters, spaces, and hyphens.
3. Avoid requiring a region or postal code where it is not applicable.
4. Display the payment amount with a clear currency, such as `USD 30.00`.
5. Apply validation rules that match the selected country.
6. Use clear labels for optional address fields.

This solution directly addresses the most severe visible problem, reduces checkout failures, and makes the billing form suitable for a global SaaS product.
