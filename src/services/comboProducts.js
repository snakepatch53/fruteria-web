import { fetchAdapter } from "./../services/apiConfig";

const resource = "combo-products";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getComboProducts() {
    const response = await fetchAdapter({
        resource,
        //printResponse: true,
    });
    return mapNames(response);
}


export async function storageComboProduct(data) {
    const response = await fetchAdapter({
        resource: resource + "?includeProduct=true",
        data,
        method: "POST",
        all: true,
    });
    return response;
}

export async function updateComboProduct(id, data) {
    const response = await fetchAdapter({
        resource: resource + "/" + id + "?includeProduct=true",
        data,
        method: "PUT",
        all: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyComboProduct(id) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
