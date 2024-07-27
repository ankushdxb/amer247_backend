import type { Schema, Attribute } from "@strapi/strapi";

export interface AdminPermission extends Schema.CollectionType {
  collectionName: "admin_permissions";
  info: {
    name: "Permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<"admin::permission", "manyToOne", "admin::role">;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: "admin_users";
  info: {
    name: "User";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<"admin::user", "manyToMany", "admin::role"> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::user", "oneToOne", "admin::user"> &
      Attribute.Private;
    updatedBy: Attribute.Relation<"admin::user", "oneToOne", "admin::user"> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: "admin_roles";
  info: {
    name: "Role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<"admin::role", "manyToMany", "admin::user">;
    permissions: Attribute.Relation<
      "admin::role",
      "oneToMany",
      "admin::permission"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<"admin::role", "oneToOne", "admin::user"> &
      Attribute.Private;
    updatedBy: Attribute.Relation<"admin::role", "oneToOne", "admin::user"> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: "strapi_api_tokens";
  info: {
    name: "Api Token";
    singularName: "api-token";
    pluralName: "api-tokens";
    displayName: "Api Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<"">;
    type: Attribute.Enumeration<["read-only", "full-access", "custom"]> &
      Attribute.Required &
      Attribute.DefaultTo<"read-only">;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      "admin::api-token",
      "oneToMany",
      "admin::api-token-permission"
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: "strapi_api_token_permissions";
  info: {
    name: "API Token Permission";
    description: "";
    singularName: "api-token-permission";
    pluralName: "api-token-permissions";
    displayName: "API Token Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      "admin::api-token-permission",
      "manyToOne",
      "admin::api-token"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "admin::api-token-permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "admin::api-token-permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: "strapi_transfer_tokens";
  info: {
    name: "Transfer Token";
    singularName: "transfer-token";
    pluralName: "transfer-tokens";
    displayName: "Transfer Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<"">;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      "admin::transfer-token",
      "oneToMany",
      "admin::transfer-token-permission"
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "admin::transfer-token",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "admin::transfer-token",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: "strapi_transfer_token_permissions";
  info: {
    name: "Transfer Token Permission";
    description: "";
    singularName: "transfer-token-permission";
    pluralName: "transfer-token-permissions";
    displayName: "Transfer Token Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      "admin::transfer-token-permission",
      "manyToOne",
      "admin::transfer-token"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "admin::transfer-token-permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "admin::transfer-token-permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: "files";
  info: {
    singularName: "file";
    pluralName: "files";
    displayName: "File";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<"plugin::upload.file", "morphToMany">;
    folder: Attribute.Relation<
      "plugin::upload.file",
      "manyToOne",
      "plugin::upload.folder"
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: "upload_folders";
  info: {
    singularName: "folder";
    pluralName: "folders";
    displayName: "Folder";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      "plugin::upload.folder",
      "manyToOne",
      "plugin::upload.folder"
    >;
    children: Attribute.Relation<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.folder"
    >;
    files: Attribute.Relation<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.file"
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: "i18n_locale";
  info: {
    singularName: "locale";
    pluralName: "locales";
    collectionName: "locales";
    displayName: "Locale";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: "up_permissions";
  info: {
    name: "permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      "plugin::users-permissions.permission",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: "up_roles";
  info: {
    name: "role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.permission"
    >;
    users: Attribute.Relation<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.user"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: "up_users";
  info: {
    name: "user";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      "plugin::users-permissions.user",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiAdultAdult extends Schema.CollectionType {
  collectionName: "adults";
  info: {
    singularName: "adult";
    pluralName: "adults";
    displayName: "Adult";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    dateOfBirth: Attribute.String;
    tourist_visa: Attribute.Relation<
      "api::adult.adult",
      "manyToOne",
      "api::tourist-visa.tourist-visa"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::adult.adult",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::adult.adult",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiAmerServiceAmerService extends Schema.CollectionType {
  collectionName: "amer_services";
  info: {
    singularName: "amer-service";
    pluralName: "amer-services";
    displayName: "amerService";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    serviceName: Attribute.String;
    applicantName: Attribute.String;
    sponsorName: Attribute.String;
    sponsorEmail: Attribute.String;
    sponsorMobileNo: Attribute.String;
    whatAppNo: Attribute.String;
    account_IBAN_No: Attribute.String;
    applicationPriority: Attribute.String;
    insideOrOutside: Attribute.String;
    requiredDocument: Attribute.Media;
    address: Attribute.Text;
    comment: Attribute.Text;
    Status: Attribute.Enumeration<
      [
        "New Request",
        "Verified",
        "Sent to Typist",
        "Payment Link Requested",
        "Submitted"
      ]
    > &
      Attribute.DefaultTo<"New Request">;
    Note_to_Customer: Attribute.Text;
    user: Attribute.Relation<
      "api::amer-service.amer-service",
      "oneToOne",
      "admin::user"
    >;
    transactionId: Attribute.String;
    transactionStatus: Attribute.String;
    formLink: Attribute.String;
    referenceID: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::amer-service.amer-service",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::amer-service.amer-service",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiChildChild extends Schema.CollectionType {
  collectionName: "children";
  info: {
    singularName: "child";
    pluralName: "children";
    displayName: "Child";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    dateOfBirth: Attribute.String;
    tourist_visa: Attribute.Relation<
      "api::child.child",
      "manyToOne",
      "api::tourist-visa.tourist-visa"
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::child.child",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::child.child",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiEmirateIdEmirateId extends Schema.CollectionType {
  collectionName: "emirate_ids";
  info: {
    singularName: "emirate-id";
    pluralName: "emirate-ids";
    displayName: "emirateID";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    serviceName: Attribute.String;
    applicantName: Attribute.String;
    sponsorName: Attribute.String;
    sponsorEmail: Attribute.Email;
    sponsorMobileNo: Attribute.String;
    whatappNo: Attribute.String;
    emirates: Attribute.String;
    P0_Box_No: Attribute.String;
    UID_No: Attribute.String;
    requiredDocment: Attribute.Media;
    address: Attribute.Text;
    comment: Attribute.String;
    Status: Attribute.Enumeration<
      [
        "New Request",
        "Verified",
        "Sent to Typist",
        "Payment Link Requested",
        "Submitted"
      ]
    >;
    Note_to_Customer: Attribute.Text;
    user: Attribute.Relation<
      "api::emirate-id.emirate-id",
      "oneToOne",
      "admin::user"
    >;
    transactionStatus: Attribute.String;
    transactionId: Attribute.String;
    formLink: Attribute.String;
    referenceID: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::emirate-id.emirate-id",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::emirate-id.emirate-id",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiGoldenVisaGoldenVisa extends Schema.CollectionType {
  collectionName: "golden_visas";
  info: {
    singularName: "golden-visa";
    pluralName: "golden-visas";
    displayName: "goldenVisa";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    serviceName: Attribute.String;
    applicantName: Attribute.String;
    mobileNo: Attribute.String;
    account_IBAN_No: Attribute.String;
    passportApplicant: Attribute.Media;
    visaCopyOfApplicant: Attribute.Media;
    emirateIdCopyOfApplicant: Attribute.Media;
    onePhotoOfApplicant: Attribute.Media;
    user: Attribute.Relation<
      "api::golden-visa.golden-visa",
      "oneToOne",
      "admin::user"
    >;
    Note_to_Customer: Attribute.Text;
    Status: Attribute.Enumeration<
      [
        "New Request",
        "Verified",
        "Sent to Typist",
        "Payment Link Requested",
        "Submitted"
      ]
    >;
    transactionId: Attribute.String;
    transactionStatus: Attribute.String;
    formLink: Attribute.Text;
    email: Attribute.String;
    referenceID: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::golden-visa.golden-visa",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::golden-visa.golden-visa",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiMedicalTestMedicalTest extends Schema.CollectionType {
  collectionName: "medical_tests";
  info: {
    singularName: "medical-test";
    pluralName: "medical-tests";
    displayName: "MedicalTest";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    serviceName: Attribute.String;
    applicantName: Attribute.String;
    sponsorName: Attribute.String;
    sponsorEmail: Attribute.String;
    sponsorMobileNo: Attribute.String;
    whatAppNo: Attribute.String;
    account_IBAN_No: Attribute.String;
    applicationPriority: Attribute.String;
    applicationType: Attribute.String;
    address: Attribute.String;
    requiredDocument: Attribute.Media;
    comment: Attribute.String;
    Note_to_Customer: Attribute.Text;
    Status: Attribute.Enumeration<
      [
        "New Request",
        "Verified",
        "Sent to Typist",
        "Payment Link Requested",
        "Submitted"
      ]
    >;
    user: Attribute.Relation<
      "api::medical-test.medical-test",
      "oneToOne",
      "admin::user"
    >;
    transactionId: Attribute.String;
    transactionStatus: Attribute.String;
    formLink: Attribute.String;
    referenceID: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::medical-test.medical-test",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::medical-test.medical-test",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}
export interface ApiInsuranceInsurance extends Schema.CollectionType {
  collectionName: "insurance";
  info: {
    singularName: "insurance";
    pluralName: "insurances";
    displayName: "Insurance";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    serviceName: Attribute.String;
    applicantName: Attribute.String;
    sponsorName: Attribute.String;
    sponsorEmail: Attribute.String;
    sponsorMobileNo: Attribute.String;
    whatAppNo: Attribute.String;
    account_IBAN_No: Attribute.String;
    applicationPriority: Attribute.String;
    applicationType: Attribute.String;
    address: Attribute.String;
    requiredDocument: Attribute.Media;
    comment: Attribute.String;
    Note_to_Customer: Attribute.Text;
    Status: Attribute.Enumeration<
      [
        "New Request",
        "Verified",
        "Sent to Typist",
        "Payment Link Requested",
        "Submitted"
      ]
    >;
    user: Attribute.Relation<
      "api::insurance.insurance",
      "oneToOne",
      "admin::user"
    >;
    transactionId: Attribute.String;
    transactionStatus: Attribute.String;
    formLink: Attribute.String;
    referenceID: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::insurance.insurance",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::insurance.insurance",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}
export interface ApiPayOnlinePayOnline extends Schema.CollectionType {
  collectionName: "pay_onlines";
  info: {
    singularName: "pay-online";
    pluralName: "pay-onlines";
    displayName: "PayOnline";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    amount: Attribute.String;
    reference: Attribute.String;
    mobile: Attribute.String;
    comments: Attribute.Text;
    email: Attribute.String;
    transactionStatus: Attribute.String;
    transactionId: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::pay-online.pay-online",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::pay-online.pay-online",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

export interface ApiTouristVisaTouristVisa extends Schema.CollectionType {
  collectionName: "tourist_visas";
  info: {
    singularName: "tourist-visa";
    pluralName: "tourist-visas";
    displayName: "TouristVisa";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applicantName: Attribute.String;
    email: Attribute.String;
    mobileNo: Attribute.String;
    nationality: Attribute.String;
    dateOfTravel: Attribute.String;
    passportCopies: Attribute.Media;
    photosOfPassenger: Attribute.Media;
    adults: Attribute.Relation<
      "api::tourist-visa.tourist-visa",
      "oneToMany",
      "api::adult.adult"
    >;
    children: Attribute.Relation<
      "api::tourist-visa.tourist-visa",
      "oneToMany",
      "api::child.child"
    >;
    transactionId: Attribute.String;
    transactionStatus: Attribute.String;
    user: Attribute.Relation<
      "api::tourist-visa.tourist-visa",
      "oneToOne",
      "admin::user"
    >;
    Note_to_Customer: Attribute.Text;
    Status: Attribute.Enumeration<
      [
        "New Request",
        "Verified",
        "Sent to Typist",
        "Payment Link Requested",
        "Submitted"
      ]
    >;
    formLink: Attribute.Text;
    serviceName: Attribute.String;
    referenceID: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      "api::tourist-visa.tourist-visa",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      "api::tourist-visa.tourist-visa",
      "oneToOne",
      "admin::user"
    > &
      Attribute.Private;
  };
}

declare module "@strapi/strapi" {
  export module Shared {
    export interface ContentTypes {
      "admin::permission": AdminPermission;
      "admin::user": AdminUser;
      "admin::role": AdminRole;
      "admin::api-token": AdminApiToken;
      "admin::api-token-permission": AdminApiTokenPermission;
      "admin::transfer-token": AdminTransferToken;
      "admin::transfer-token-permission": AdminTransferTokenPermission;
      "plugin::upload.file": PluginUploadFile;
      "plugin::upload.folder": PluginUploadFolder;
      "plugin::i18n.locale": PluginI18NLocale;
      "plugin::users-permissions.permission": PluginUsersPermissionsPermission;
      "plugin::users-permissions.role": PluginUsersPermissionsRole;
      "plugin::users-permissions.user": PluginUsersPermissionsUser;
      "api::adult.adult": ApiAdultAdult;
      "api::amer-service.amer-service": ApiAmerServiceAmerService;
      "api::child.child": ApiChildChild;
      "api::emirate-id.emirate-id": ApiEmirateIdEmirateId;
      "api::golden-visa.golden-visa": ApiGoldenVisaGoldenVisa;
      "api::medical-test.medical-test": ApiMedicalTestMedicalTest;
      "api::insurance.insurance": ApiInsuranceInsurance;
      "api::pay-online.pay-online": ApiPayOnlinePayOnline;
      "api::tourist-visa.tourist-visa": ApiTouristVisaTouristVisa;
    }
  }
}
