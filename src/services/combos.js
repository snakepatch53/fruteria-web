import { fetchAdapter } from "./../services/apiConfig";

const resource = "combos";

function mapNames(data) {
    return data.map(({ ...props }) => ({
        ...props,
    }));
}

export async function getCombos() {
    const response = await fetchAdapter({
        resource: resource + "?includeComboProducts=true&includeComboSales=true",
        //printResponse: true,
    });
    return mapNames(response);
}

export async function getCombo(id) {
    const response = await fetchAdapter({
        resource: resource + "/" + id + "?includeComboProducts=true"
        //printResponse: true,
    });
    return response;
}

export async function storageCombo({ data }) {
    const response = await fetchAdapter({
        resource,
        data,
        method: "POST",
        all: true,
        // formData: true,
    });
    return response;
}

export async function updateCombo({ id, data }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id + "?includeComboProducts=true",
        data,
        method: "PUT",
        all: true,
        // formData: true,
        // printResponse: true,
    });
    return response;
}

export async function destroyCombo({ id }) {
    const response = await fetchAdapter({
        resource: resource + "/" + id,
        method: "DELETE",
        all: true,
    });
    return response;
}
