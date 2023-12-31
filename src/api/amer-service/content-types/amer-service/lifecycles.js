module.exports = {
  /**
   * @param {{ result: any; params:any}} event
   */
  async beforeUpdate(event) {
    // Connected to "Save" button in admin panel
    const { params } = event;
    const newData = params.data;

    // Fetch the previous state of the record
    const previousState = await strapi.entityService.findOne(
      "api::amer-service.amer-service",
      params.where.id
    );

    try {
      let emailSubject, emailBody;
      if (previousState.Status !== newData.Status) {
        // Customize email based on the new status
        if (newData.Status === "Incomplete") {
          emailSubject = "Action Required: Your Task is Incomplete";
          emailBody = `
          <body>
            <p>Hello,</p>
            <p>Your task is marked as Incomplete.</p>
            <p>Notes: ${newData.Note_to_Customer || "No additional notes"}</p>
          </body>
        `;
        } else if (newData.Status === "Complete") {
          emailSubject = "Congratulations: Your Task is Complete";
          emailBody = `
          <body>
            <p>Hello,</p>
            <p>Your task is successfully completed.</p>
            <p>Well done!</p>
          </body>
        `;
        } else if (newData.Status === "New Request") {
          return;
        }
        await strapi.plugins["email"].services.email.send({
          to: newData.sponsorEmail,
          from: "umarasif737@gmail.com",
          subject: emailSubject,
          html: emailBody,
        });
        return;
      }
      if (previousState.Note_to_Customer !== newData.Note_to_Customer) {
        emailSubject = "Action Required: Your Task is Incomplete";
        emailBody = `
          <body>
            <p>Hello,</p>
            <p>Your task is marked as Incomplete.</p>
            <p>Notes: ${newData.Note_to_Customer || "No additional notes"}</p>
          </body>
        `;
        await strapi.plugins["email"].services.email.send({
          to: newData.sponsorEmail,
          from: "umarasif737@gmail.com",
          subject: emailSubject,
          html: emailBody,
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
