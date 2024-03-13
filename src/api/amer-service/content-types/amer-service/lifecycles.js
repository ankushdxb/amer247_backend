module.exports = {
  /**
   * @param {{ result: any; params:any}} event
   */
  async beforeUpdate(event) {
    // Connected to "Save" button in admin panel
    const { params } = event;
    const newData = params.data;

    // Check if newData is present
    if (!newData) {
      throw new Error("New data is not provided.");
    }

    // Fetch the previous state of the record
    const previousState = await strapi.entityService.findOne(
      "api::amer-service.amer-service",
      params.where.id
    );

    // Check if previousState is present
    if (!previousState) {
      throw new Error("Previous state of the record not found.");
    }

    try {
      let emailSubject, emailBody;

      // Function to send email
      const sendEmail = async (subject, body) => {
        await strapi.plugins["email"].services.email.send({
          to: newData.sponsorEmail,
          from: "noreply@amer247.com",
          subject,
          html: body,
        });
      };

      // Check if the status has changed
      if (previousState.Status !== newData.Status) {
        const note =
          newData.Note_to_Customer && newData.Note_to_Customer.trim() !== ""
            ? `<p> ${newData.Note_to_Customer} </p>`
            : "";

        switch (newData.Status) {
          case "Verified":
            emailSubject = `Request Verified to Typist for ${previousState.serviceName} - ${previousState.referenceID}`;
            emailBody = `
      <html>
        <body>
          <p>Dear ${previousState.applicantName},</p>
          <p>I hope this email finds you well. We're writing to inform you that your recent request has been successfully verified. We understand the importance of timely and accurate processing, and we're pleased to confirm that everything is in order.</p>
          <p>Your satisfaction is our top priority, and we're committed to providing you with excellent service every step of the way. If you have any questions or need further assistance, please don't hesitate to reach out to us. Our dedicated 24 hours support team is here to help through WhatsApp +971581257700 and ensure that your experience with us remains smooth and efficient.</p>
          <p>Once again, thank you for choosing Amer247. We appreciate your trust and confidence in our services.</p>
          <p>Best regards,<br>Amer247</p>
        </body>
      </html>
    `;
            break;
          case "Sent to Typist":
            emailSubject = `Request Sent to Typist for ${previousState.serviceName} - ${previousState.referenceID}`;
            emailBody = `
      <html>
        <body>
          <p>Dear ${previousState.applicantName},</p>
          <p>I hope this email finds you well. We're writing to inform you that your recent request is currently being processed by our typist. We understand the importance of timely and accurate processing, and we're pleased to confirm that everything is in order.</p>
          <p><b>Note:</b><br>${note}</p>
          <p>Your satisfaction is our top priority, and we're committed to providing you with excellent service every step of the way. If you have any questions or need further assistance, please don't hesitate to reach out to us. Our dedicated 24 hours support team is here to help through WhatsApp +971581257700 and ensure that your experience with us remains smooth and efficient.</p>
          <p>Once again, thank you for choosing Amer247. We appreciate your trust and confidence in our services.</p>
          <p>Best regards,<br>Amer247</p>
        </body>
      </html>
    `;
            break;
          case "Payment Link Requested":
            emailSubject = `Payment Link Requested for ${previousState.serviceName} - ${previousState.referenceID}`;
            emailBody = `
      <html>
        <body>
          <p>Dear ${previousState.applicantName},</p>
          <p>I hope this email finds you well. We're writing to inform you that please proceed with the payment using the link provided. We understand the importance of timely and accurate processing, and we're pleased to confirm that everything is in order.</p>
          <p><b>Payment Link:</b><br>${note}</p>
          <p>Your satisfaction is our top priority, and we're committed to providing you with excellent service every step of the way. If you have any questions or need further assistance, please don't hesitate to reach out to us. Our dedicated 24 hours support team is here to help through WhatsApp +971581257700 and ensure that your experience with us remains smooth and efficient.</p>
          <p>Once again, thank you for choosing Amer247. We appreciate your trust and confidence in our services.</p>
          <p>Best regards,<br>Amer247</p>
        </body>
      </html>
    `;
            break;
          case "Submitted":
            emailSubject = `Request Approved for ${previousState.serviceName} - ${previousState.referenceID}`;
            emailBody = `
      <html>
        <body>
          <p>Dear ${previousState.applicantName},</p>
          <p>I hope this email finds you well. We're writing to inform you that your recent request has been successfully verified. We understand the importance of timely and accurate processing, and we're pleased to confirm that everything is in order.</p>
          <p>Your satisfaction is our top priority, and we're committed to providing you with excellent service every step of the way. If you have any questions or need further assistance, please don't hesitate to reach out to us. Our dedicated 24 hours support team is here to help through WhatsApp +971581257700 and ensure that your experience with us remains smooth and efficient.</p>
          <p>Once again, thank you for choosing Amer247. We appreciate your trust and confidence in our services.</p>
          <p>Best regards,<br>Amer247</p>
        </body>
      </html>
    `;
            break;
          default:
            // If the status is not recognized, no email is sent
            return;
        }
        await sendEmail(emailSubject, emailBody);
      }
    } catch (err) {
      console.error("Error in beforeUpdate:", err);
      // Handle the error appropriately
    }
  },
};
