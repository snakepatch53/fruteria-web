import { fetchAdapter } from "./../services/apiConfig";

const resource = "products";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getProducts() {
    const response = await fetchAdapter({
        resource: resource + "?includeProductSales=true ",
        //printResponse: true,
    });
    return mapNames(response);
}

export async function storageProduct({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
        formData: true,
    });
    return response;
}

export async function updateProduct({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        data,
        method: "POST",
        all: true,
        formData: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyProduct({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
