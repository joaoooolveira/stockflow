const API = {
    products: "/products",
    categories: "/categories",
    movements: "/movements"
};

function showToast(
    type,
    title,
    message,
    duration = 4000
) {

    const container =
        document.getElementById(
            "toast-container"
        );

    const toast =
        document.createElement("div");

    const icons = {
        success: "✓",
        error: "✕",
        warning: "!",
        info: "i"
    };

    toast.className =
        `toast ${type}`;

    toast.innerHTML = `
        <div class="toast-icon">
            ${icons[type]}
        </div>

        <div class="toast-content">

            <div class="toast-title">
                ${title}
            </div>

            <div class="toast-message">
                ${message}
            </div>

        </div>

        <button
            class="toast-close"
            onclick="removeToast(this.parentElement)">

            ×

        </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {

        removeToast(toast);

    }, duration);
}

function removeToast(toast) {

    if (!toast || !toast.parentElement) {
        return;
    }

    toast.classList.add("removing");

    setTimeout(() => {

        if (toast.parentElement) {
            toast.remove();
        }

    }, 300);
}

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(element => {
            element.classList.add("hidden");
        });

    document
        .getElementById(page + "-page")
        .classList.remove("hidden");

    document
        .querySelectorAll(".nav-item")
        .forEach(button => {
            button.classList.remove("active");
        });

    document
        .querySelector(
            `[onclick="showPage('${page}')"]`
        )
        .classList.add("active");

    const titles = {
        dashboard: "Dashboard",
        products: "Produtos",
        categories: "Categorias",
        movements: "Movimentações"
    };

    const descriptions = {
        dashboard: "Visão geral do seu estoque",
        products: "Gerencie os produtos do estoque.",
        categories: "Gerencie as categorias dos produtos.",
        movements: "Histórico de entradas e saídas do estoque."
    };

    document
        .getElementById("page-title")
        .textContent = titles[page];

    document
        .getElementById("page-description")
        .textContent = descriptions[page];

    if (page === "dashboard") {
        loadDashboard();
    }

    if (page === "products") {
        loadProducts();
    }

    if (page === "categories") {
        loadCategories();
    }

    if (page === "movements") {
        loadMovements();
    }
}

async function loadDashboard() {

    try {

        const productsResponse =
            await fetch(API.products);

        const categoriesResponse =
            await fetch(API.categories);

        const movementsResponse =
            await fetch(API.movements);

        if (
            !productsResponse.ok ||
            !categoriesResponse.ok ||
            !movementsResponse.ok
        ) {

            throw new Error(
                "Erro ao carregar dados do dashboard."
            );
        }

        const products =
            await productsResponse.json();

        const categories =
            await categoriesResponse.json();

        const movements =
            await movementsResponse.json();

        document
            .getElementById("total-products")
            .textContent =
                products.length;

        document
            .getElementById("total-categories")
            .textContent =
                categories.length;

        document
            .getElementById("total-movements")
            .textContent =
                movements.length;

        const table =
            document.getElementById(
                "dashboard-products"
            );

        const emptyState =
            document.getElementById(
                "dashboard-empty"
            );

        table.innerHTML = "";

        if (products.length === 0) {

            emptyState.classList.remove(
                "hidden"
            );

            return;
        }

        emptyState.classList.add(
            "hidden"
        );

        products.forEach(product => {

            const row =
                document.createElement("tr");

            const categoryName =
                product.category
                    ? product.category.name_category
                    : "Sem categoria";

            row.innerHTML = `
                <td>
                    ${product.name_product}
                </td>

                <td>
                    ${categoryName}
                </td>

                <td>
                    R$ ${Number(
                        product.price_product
                    ).toFixed(2)}
                </td>

                <td>
                    ${product.quantity_product}
                </td>
            `;

            table.appendChild(row);
        });

    } catch (error) {

        console.error(
            "Erro ao carregar dashboard:",
            error
        );

        showToast(
            "error",
            "Erro no dashboard",
            "Não foi possível carregar os dados do estoque."
        );
    }
}

async function loadProducts() {

    try {

        const response =
            await fetch(API.products);

        if (!response.ok) {

            throw new Error(
                "Erro ao buscar produtos."
            );
        }

        const products =
            await response.json();

        const table =
            document.getElementById(
                "products-table"
            );

        table.innerHTML = "";

        products.forEach(product => {

            const row =
                document.createElement("tr");

            const categoryName =
                product.category
                    ? product.category.name_category
                    : "Sem categoria";

            row.innerHTML = `
                <td>
                    ${product.id_product}
                </td>

                <td>
                    <strong>
                        ${product.name_product}
                    </strong>
                </td>

                <td>
                    ${categoryName}
                </td>

                <td>
                    R$ ${Number(
                        product.price_product
                    ).toFixed(2)}
                </td>

                <td>
                    ${product.quantity_product}
                </td>

                <td>

                    <button
                        class="action-button edit"
                        onclick="editProduct(
                            ${product.id_product}
                        )">

                        Editar

                    </button>

                    <button
                        class="action-button delete"
                        onclick="deleteProduct(
                            ${product.id_product}
                        )">

                        Excluir

                    </button>

                </td>
            `;

            table.appendChild(row);
        });

    } catch (error) {

        console.error(
            "Erro ao carregar produtos:",
            error
        );

        showToast(
            "error",
            "Erro ao carregar produtos",
            "Não foi possível carregar os produtos."
        );
    }
}

async function loadCategoriesForProduct(
    selectedCategoryId = null
) {

    try {

        const response =
            await fetch(API.categories);

        if (!response.ok) {

            throw new Error(
                "Erro ao buscar categorias."
            );
        }

        const categories =
            await response.json();

        const select =
            document.getElementById(
                "product-category"
            );

        select.innerHTML = `
            <option value="">
                Selecione uma categoria
            </option>
        `;

        categories.forEach(category => {

            const option =
                document.createElement("option");

            option.value =
                category.id_category;

            option.textContent =
                category.name_category;

            if (
                selectedCategoryId &&
                Number(selectedCategoryId) ===
                Number(category.id_category)
            ) {

                option.selected = true;
            }

            select.appendChild(option);
        });

    } catch (error) {

        console.error(
            "Erro ao carregar categorias:",
            error
        );

        showToast(
            "error",
            "Erro ao carregar categorias",
            "Não foi possível carregar as categorias."
        );
    }
}

async function openProductForm() {

    document
        .getElementById("product-modal")
        .classList.remove("hidden");

    document
        .getElementById("product-form-title")
        .textContent =
            "Novo Produto";

    document
        .getElementById("product-form")
        .reset();

    document
        .getElementById("product-id")
        .value = "";

    await loadCategoriesForProduct();
}

function closeProductForm() {

    document
        .getElementById("product-modal")
        .classList.add("hidden");
}

document
    .getElementById("product-form")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const id =
                document
                    .getElementById(
                        "product-id"
                    )
                    .value;

            const name =
                document
                    .getElementById(
                        "product-name"
                    )
                    .value
                    .trim();

            const price =
                Number(
                    document
                        .getElementById(
                            "product-price"
                        )
                        .value
                );

            const quantity =
                Number(
                    document
                        .getElementById(
                            "product-quantity"
                        )
                        .value
                );

            const categoryId =
                document
                    .getElementById(
                        "product-category"
                    )
                    .value;

            if (!name) {

                showToast(
                    "warning",
                    "Validação",
                    "Informe o nome do produto."
                );

                return;
            }

            if (
                !Number.isFinite(price) ||
                price < 0
            ) {

                showToast(
                    "warning",
                    "Preço inválido",
                    "O preço não pode ser negativo."
                );

                return;
            }

            if (
                Math.round(price * 100) % 50 !== 0
            ) {

                showToast(
                    "warning",
                    "Preço inválido",
                    "O preço deve ser informado em intervalos de R$ 0,50."
                );

                return;
            }

            if (
                !Number.isInteger(quantity) ||
                quantity < 0
            ) {

                showToast(
                    "warning",
                    "Quantidade inválida",
                    "A quantidade deve ser um número inteiro maior ou igual a zero."
                );

                return;
            }

            if (!categoryId) {

                showToast(
                    "warning",
                    "Categoria obrigatória",
                    "Selecione uma categoria para o produto."
                );

                return;
            }

            const product = {

                name_product:
                    name,

                price_product:
                    price,

                quantity_product:
                    quantity,

                category: {

                    id_category:
                        Number(categoryId)
                }
            };

            try {

                let response;

                if (id) {

                    response =
                        await fetch(
                            `${API.products}/${id}`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        product
                                    )
                            }
                        );

                } else {

                    response =
                        await fetch(
                            API.products,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        product
                                    )
                            }
                        );
                }

                if (!response.ok) {

                    let message =
                        "Não foi possível salvar o produto.";

                    try {

                        const errorData =
                            await response.json();

                        if (errorData.message) {
                            message =
                                errorData.message;
                        }

                    } catch (error) {

                    }

                    showToast(
                        "error",
                        "Erro ao salvar",
                        message
                    );

                    return;
                }

                closeProductForm();

                await loadProducts();

                await loadDashboard();

                if (id) {

                    showToast(
                        "success",
                        "Produto atualizado",
                        "O produto foi atualizado com sucesso."
                    );

                } else {

                    showToast(
                        "success",
                        "Produto cadastrado",
                        "O produto foi cadastrado com sucesso."
                    );
                }

            } catch (error) {

                console.error(error);

                showToast(
                    "error",
                    "Erro de conexão",
                    "Não foi possível conectar ao servidor."
                );
            }
        }
    );

async function editProduct(id) {

    try {

        const response =
            await fetch(
                `${API.products}/${id}`
            );

        if (!response.ok) {

            showToast(
                "error",
                "Produto não encontrado",
                "Não foi possível encontrar o produto."
            );

            return;
        }

        const product =
            await response.json();

        document
            .getElementById("product-id")
            .value =
                product.id_product;

        document
            .getElementById("product-name")
            .value =
                product.name_product;

        document
            .getElementById("product-price")
            .value =
                product.price_product;

        document
            .getElementById("product-quantity")
            .value =
                product.quantity_product;

        document
            .getElementById("product-form-title")
            .textContent =
                "Editar Produto";

        document
            .getElementById("product-modal")
            .classList.remove("hidden");

        const categoryId =
            product.category
                ? product.category.id_category
                : null;

        await loadCategoriesForProduct(
            categoryId
        );

    } catch (error) {

        console.error(
            "Erro ao buscar produto:",
            error
        );

        showToast(
            "error",
            "Erro",
            "Não foi possível carregar o produto."
        );
    }
}

async function deleteProduct(id) {

    const confirmation =
        confirm(
            "Deseja realmente excluir este produto?"
        );

    if (!confirmation) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API.products}/${id}`,
                {
                    method: "DELETE"
                }
            );

        if (!response.ok) {

            showToast(
                "error",
                "Erro ao excluir",
                "Não foi possível excluir o produto."
            );

            return;
        }

        await loadProducts();

        await loadDashboard();

        showToast(
            "success",
            "Produto excluído",
            "O produto foi removido com sucesso."
        );

    } catch (error) {

        console.error(error);

        showToast(
            "error",
            "Erro de conexão",
            "Não foi possível conectar ao servidor."
        );
    }
}

async function loadCategories() {

    try {

        const response =
            await fetch(API.categories);

        if (!response.ok) {

            throw new Error(
                "Erro ao buscar categorias."
            );
        }

        const categories =
            await response.json();

        const table =
            document.getElementById(
                "categories-table"
            );

        const emptyState =
            document.getElementById(
                "categories-empty"
            );

        table.innerHTML = "";

        if (categories.length === 0) {

            emptyState.classList.remove(
                "hidden"
            );

            return;
        }

        emptyState.classList.add(
            "hidden"
        );

        categories.forEach(category => {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>
                    ${category.id_category}
                </td>

                <td>
                    <strong>
                        ${category.name_category}
                    </strong>
                </td>

                <td>

                    <button
                        class="action-button edit"
                        onclick="editCategory(
                            ${category.id_category}
                        )">

                        Editar

                    </button>

                    <button
                        class="action-button delete"
                        onclick="deleteCategory(
                            ${category.id_category}
                        )">

                        Excluir

                    </button>

                </td>
            `;

            table.appendChild(row);
        });

    } catch (error) {

        console.error(
            "Erro ao carregar categorias:",
            error
        );

        showToast(
            "error",
            "Erro ao carregar categorias",
            "Não foi possível carregar as categorias."
        );
    }
}

function openCategoryForm() {

    document
        .getElementById("category-modal")
        .classList.remove("hidden");

    document
        .getElementById("category-form-title")
        .textContent =
            "Nova Categoria";

    document
        .getElementById("category-form")
        .reset();

    document
        .getElementById("category-id")
        .value = "";
}

function closeCategoryForm() {

    document
        .getElementById("category-modal")
        .classList.add("hidden");
}

document
    .getElementById("category-form")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const id =
                document
                    .getElementById(
                        "category-id"
                    )
                    .value;

            const name =
                document
                    .getElementById(
                        "category-name"
                    )
                    .value
                    .trim();

            if (!name) {

                showToast(
                    "warning",
                    "Validação",
                    "Informe o nome da categoria."
                );

                return;
            }

            const category = {

                name_category:
                    name
            };

            try {

                let response;

                if (id) {

                    response =
                        await fetch(
                            `${API.categories}/${id}`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        category
                                    )
                            }
                        );

                } else {

                    response =
                        await fetch(
                            API.categories,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        category
                                    )
                            }
                        );
                }

                if (!response.ok) {

                    let message =
                        "Não foi possível salvar a categoria.";

                    try {

                        const errorData =
                            await response.json();

                        if (errorData.message) {
                            message =
                                errorData.message;
                        }

                    } catch (error) {

                    }

                    showToast(
                        "error",
                        "Erro ao salvar",
                        message
                    );

                    return;
                }

                closeCategoryForm();

                await loadCategories();

                await loadCategoriesForProduct();

                await loadDashboard();

                if (id) {

                    showToast(
                        "success",
                        "Categoria atualizada",
                        "A categoria foi atualizada com sucesso."
                    );

                } else {

                    showToast(
                        "success",
                        "Categoria cadastrada",
                        "A categoria foi cadastrada com sucesso."
                    );
                }

            } catch (error) {

                console.error(error);

                showToast(
                    "error",
                    "Erro de conexão",
                    "Não foi possível conectar ao servidor."
                );
            }
        }
    );

async function editCategory(id) {

    try {

        const response =
            await fetch(
                `${API.categories}/${id}`
            );

        if (!response.ok) {

            showToast(
                "error",
                "Categoria não encontrada",
                "Não foi possível encontrar a categoria."
            );

            return;
        }

        const category =
            await response.json();

        document
            .getElementById("category-id")
            .value =
                category.id_category;

        document
            .getElementById("category-name")
            .value =
                category.name_category;

        document
            .getElementById(
                "category-form-title"
            )
            .textContent =
                "Editar Categoria";

        document
            .getElementById(
                "category-modal"
            )
            .classList.remove("hidden");

    } catch (error) {

        console.error(error);

        showToast(
            "error",
            "Erro",
            "Não foi possível carregar a categoria."
        );
    }
}

async function deleteCategory(id) {

    const confirmation =
        confirm(
            "Deseja realmente excluir esta categoria?"
        );

    if (!confirmation) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API.categories}/${id}`,
                {
                    method: "DELETE"
                }
            );

        if (!response.ok) {

            let message =
                "Não foi possível excluir a categoria.";

            try {

                const errorData =
                    await response.json();

                if (errorData.message) {
                    message =
                        errorData.message;
                }

            } catch (error) {

            }

            showToast(
                "error",
                "Erro ao excluir",
                message
            );

            return;
        }

        await loadCategories();

        await loadCategoriesForProduct();

        await loadProducts();

        await loadDashboard();

        showToast(
            "success",
            "Categoria excluída",
            "A categoria foi removida com sucesso."
        );

    } catch (error) {

        console.error(error);

        showToast(
            "error",
            "Erro de conexão",
            "Não foi possível conectar ao servidor."
        );
    }
}

async function loadMovements() {

    try {

        const response =
            await fetch(API.movements);

        if (!response.ok) {

            throw new Error(
                "Erro ao buscar movimentações."
            );
        }

        const movements =
            await response.json();

        const table =
            document.getElementById(
                "movements-table"
            );

        const emptyState =
            document.getElementById(
                "movements-empty"
            );

        table.innerHTML = "";

        if (movements.length === 0) {

            emptyState.classList.remove(
                "hidden"
            );

            return;
        }

        emptyState.classList.add(
            "hidden"
        );

        movements.forEach(movement => {

            const row =
                document.createElement("tr");

            const product =
                movement.id_product;

            const productName =
                product
                    ? product.name_product
                    : "Produto não encontrado";

            const movementType =
                movement.type_movement;

            const typeClass =
                movementType === "ENTRADA"
                    ? "movement-entry"
                    : "movement-exit";

            const typeName =
                movementType === "ENTRADA"
                    ? "Entrada"
                    : "Saída";

            row.innerHTML = `
                <td>
                    ${movement.id_movement}
                </td>

                <td>
                    ${productName}
                </td>

                <td class="${typeClass}">
                    ${typeName}
                </td>

                <td>
                    ${movement.quantity_movement}
                </td>

                <td>
                    ${movement.date_movement}
                </td>
            `;

            table.appendChild(row);
        });

    } catch (error) {

        console.error(
            "Erro ao carregar movimentações:",
            error
        );

        showToast(
            "error",
            "Erro ao carregar movimentações",
            "Não foi possível carregar o histórico."
        );
    }
}

async function openMovementForm() {

    document
        .getElementById("movement-modal")
        .classList.remove("hidden");

    document
        .getElementById("movement-form")
        .reset();

    await loadProductsForMovement();
}

function closeMovementForm() {

    document
        .getElementById("movement-modal")
        .classList.add("hidden");
}

async function loadProductsForMovement() {

    try {

        const response =
            await fetch(API.products);

        if (!response.ok) {

            throw new Error(
                "Erro ao buscar produtos."
            );
        }

        const products =
            await response.json();

        const select =
            document.getElementById(
                "movement-product"
            );

        select.innerHTML = `
            <option value="">
                Selecione um produto
            </option>
        `;

        products.forEach(product => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                product.id_product;

            option.textContent =
                `${product.name_product} - Estoque: ${product.quantity_product}`;

            select.appendChild(option);
        });

    } catch (error) {

        console.error(
            "Erro ao carregar produtos para movimentação:",
            error
        );

        showToast(
            "error",
            "Erro ao carregar produtos",
            "Não foi possível carregar os produtos para a movimentação."
        );
    }
}

document
    .getElementById("movement-form")
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const productId =
                document
                    .getElementById(
                        "movement-product"
                    )
                    .value;

            const type =
                document
                    .getElementById(
                        "movement-type"
                    )
                    .value;

            const quantity =
                Number(
                    document
                        .getElementById(
                            "movement-quantity"
                        )
                        .value
                );

            if (!productId) {

                showToast(
                    "warning",
                    "Produto obrigatório",
                    "Selecione um produto para realizar a movimentação."
                );

                return;
            }

            if (!type) {

                showToast(
                    "warning",
                    "Tipo obrigatório",
                    "Selecione Entrada ou Saída."
                );

                return;
            }

            if (
                !Number.isInteger(quantity) ||
                quantity <= 0
            ) {

                showToast(
                    "warning",
                    "Quantidade inválida",
                    "A quantidade deve ser um número inteiro maior que zero."
                );

                return;
            }

            const movement = {

                id_product: {

                    id_product:
                        Number(productId)
                },

                type_movement:
                    type,

                quantity_movement:
                    quantity
            };

            try {

                const response =
                    await fetch(
                        API.movements,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    movement
                                )
                        }
                    );

                if (!response.ok) {

                    let errorMessage =
                        "Não foi possível registrar a movimentação.";

                    try {

                        const errorData =
                            await response.json();

                        if (
                            errorData.message
                        ) {

                            errorMessage =
                                errorData.message;

                        } else if (
                            errorData.error
                        ) {

                            errorMessage =
                                errorData.error;
                        }

                    } catch (error) {

                    }

                    showToast(
                        "error",
                        "Movimentação não realizada",
                        errorMessage,
                        5000
                    );

                    return;
                }

                closeMovementForm();

                await loadMovements();

                await loadProducts();

                await loadDashboard();

                if (type === "ENTRADA") {

                    showToast(
                        "success",
                        "Entrada registrada",
                        `${quantity} unidade(s) adicionada(s) ao estoque.`
                    );

                } else {

                    showToast(
                        "success",
                        "Saída registrada",
                        `${quantity} unidade(s) retirada(s) do estoque.`
                    );
                }

            } catch (error) {

                console.error(
                    "Erro ao registrar movimentação:",
                    error
                );

                showToast(
                    "error",
                    "Erro de conexão",
                    "Não foi possível conectar ao servidor."
                );
            }
        }
    );

loadDashboard();