import { fetchAdapter } from "./../services/apiConfig";

const resource = "sales";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getSales() {
    const response = await fetchAdapter({
        resource: resource + "?includeCustomer=true&includeProductSales=true&includeComboSales=true",
        // printResponse: true,
    });
    return mapNames(response);
}

export async function getSale(id) {
    const response = await fetchAdapter({
        resource: resource + "/" + id + "?includeCustomer=true&includeProductSales=true&includeComboSales=true",
        // printResponse: true,
    });
    return response;
}

export async function storageSale(data) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
        // formData: true,
    });
    return response;
}

export async function updateSale(id, data) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "POST",
        all: true,
        // formData: true,
        // printResponse: true,
    });
    return response;
}

export async function destroySale(id) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
