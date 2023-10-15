import http from "../../../../http-access-control";
// import authHeader from "../../authencations/AuthHeader";

export default class VendorManagementsAccountServices {
    async createVendorAccountManagements(vendor) {
       return http.post("/vendors/users_management/vendors_by_ms/created_vendor_under_owner_mg", vendor);
    }
    async updatedVendorAccountManagements(vendorId, vendor) {
        return http.put(`/vendors/users_management/vendors_by_ms/updated_vendor_under_owner_mg/${vendorId ? vendorId : 0}`, vendor);
    }
}