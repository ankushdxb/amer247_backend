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
          from: process.env.SENDER_EMAIL || "umarasif737@gmail.com",
          subject,
          html: body,
        });
      };

      // Check if the status has changed
      if (previousState.Status !== newData.Status) {
        const note =
          newData.Note_to_Customer && newData.Note_to_Customer.trim() !== ""
            ? ` ${newData.Note_to_Customer}`
            : "";

        switch (newData.Status) {
          case "Verified":
            emailSubject = `Request Verified to Typist for ${previousState.serviceName} - ${previousState.referenceID}`;
            emailBody = `<p>
            
Dear ${previousState.applicantName},

I hope this email finds you well. We're writing to inform you that your recent request has been successfully verified. We understand the importance of timely and accurate processing, and we're pleased to confirm that everything is in order.

Your satisfaction is our top priority, and we're committed to providing you with excellent service every step of the way. If you have any questions or need further assistance, please don't hesitate to reach out to us. Our dedicated 24 hours support team is here to help through  whatsapp +971581257700 and ensure that your experience with us remains smooth and efficient.

Once again, thank you for choosing Amer247. We appreciate your trust and confidence in our services.

Best regards,
Amer247
            
            </p>`;
            break;
          case "Sent to Typist":
            emailSubject = `Request Sent to Typist for ${previousState.serviceName} - ${previousState.referenceID}`;
            emailBody = `<$>
Dear ${previousState.applicantName},

I hope this email finds you well. We're writing to inform you that your recent request is currently being processed by our typist. We understand the importance of timely and accurate processing, and we're pleased to confirm that everything is in order.

<b>Note</b>
${note} 


Your satisfaction is our top priority, and we're committed to providing you with excellent service every step of the way. If you have any questions or need further assistance, please don't hesitate to reach out to us. Our dedicated 24 hours support team is here to help through  whatsapp +971581257700 and ensure that your experience with us remains smooth and efficient.

Once again, thank you for choosing Amer247. We appreciate your trust and confidence in our services.

Best regards,
Amer247        
            </p>`;
            break;
          case "Payment Link Requested":
            emailSubject = `Payment Link Requested for ${previousState.serviceName} - ${previousState.referenceID}`;
            emailBody = `<body><p>Hello,</p><p>Please proceed with the payment using the link provided.</p>${note}
Dear ${previousState.applicantName},

I hope this email finds you well. We're writing to inform you that please proceed with the payment using the link provided. We understand the importance of timely and accurate processing, and we're pleased to confirm that everything is in order.

<b>Payment Link</b>
${note} 


Your satisfaction is our top priority, and we're committed to providing you with excellent service every step of the way. If you have any questions or need further assistance, please don't hesitate to reach out to us. Our dedicated 24 hours support team is here to help through  whatsapp +971581257700 and ensure that your experience with us remains smooth and efficient.

Once again, thank you for choosing Amer247. We appreciate your trust and confidence in our services.

Best regards,
Amer247  
            
            </body>`;
            break;
          case "Submitted":
            emailSubject = `Request Approved for ${previousState.serviceName} - ${previousState.referenceID}`;
            emailBody = `<p>
            
Dear ${previousState.applicantName},

I hope this email finds you well. We're writing to inform you that your recent request has been successfully verified. We understand the importance of timely and accurate processing, and we're pleased to confirm that everything is in order.

Your satisfaction is our top priority, and we're committed to providing you with excellent service every step of the way. If you have any questions or need further assistance, please don't hesitate to reach out to us. Our dedicated 24 hours support team is here to help through  whatsapp +971581257700 and ensure that your experience with us remains smooth and efficient.

Once again, thank you for choosing Amer247. We appreciate your trust and confidence in our services.

Best regards,
Amer247
            
            </p>`;
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
