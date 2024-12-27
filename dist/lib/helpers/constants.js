"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackTextMapper = exports.FormatDateOptionsEnum = void 0;
var FormatDateOptionsEnum;
(function (FormatDateOptionsEnum) {
    FormatDateOptionsEnum["LONG"] = "long";
    FormatDateOptionsEnum["SHORT"] = "short";
})(FormatDateOptionsEnum || (exports.FormatDateOptionsEnum = FormatDateOptionsEnum = {}));
exports.feedbackTextMapper = {
    create: (tag) => `${tag} created successfully`,
    delete: (tag) => `${tag} deleted successfully`,
    update: (tag) => `${tag} updated successfully`,
};
//# sourceMappingURL=constants.js.map