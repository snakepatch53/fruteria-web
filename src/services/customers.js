import { fetchAdapter } from "./../services/apiConfig";

const resource = "customers";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getCustomers() {
    const response = await fetchAdapter({
        resource,
        // printResponse: true,
    });
    return mapNames(response);
}

export async function storageCustomer(data) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
        // formData: true,
    });
    return response;
}

export async function updateCustomer(id, data) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "PUT",
        all: true,
        // formData: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyCustomer(id) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}

