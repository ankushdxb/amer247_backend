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
      "api::golden-visa.golden-visa",
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
          to: newData.email,
          from: process.env.SENDER_EMAIL || "umarasif737@gmail.com",
          subject,
          html: body,
        });
      };

      // Check if the status has changed
      if (previousState.Status !== newData.Status) {
        const note =
          newData.Note_to_Customer && newData.Note_to_Customer.trim() !== ""
            ? `<p>Note: ${newData.Note_to_Customer}</p>`
            : "";

        switch (newData.Status) {
          case "New Request":
            emailSubject = "New Request Received";
            emailBody = `<body><p>Hello,</p><p>We have received your new request.</p>${note}</body>`;
            break;
          case "Verified":
            emailSubject = "Request Verified";
            emailBody = `<body><p>Hello,</p><p>Your request has been verified.</p>${note}</body>`;
            break;
          case "Sent to Typist":
            emailSubject = "Request in Progress";
            emailBody = `<body><p>Hello,</p><p>Your request is currently being processed by our typist.</p>${note}</body>`;
            break;
          case "Payment Link Requested":
            emailSubject = "Payment Link Requested";
            emailBody = `<body><p>Hello,</p><p>Please proceed with the payment using the link provided.</p>${note}</body>`;
            break;
          case "Submitted":
            emailSubject = "Request Submitted";
            emailBody = `<body><p>Hello,</p><p>Your request has been successfully submitted and is under review.</p>${note}</body>`;
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
