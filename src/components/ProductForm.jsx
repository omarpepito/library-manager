import React, { useState } from "react";
import {
Box,
Grid,
TextField,
FormControl,
InputLabel,
Select,
MenuItem,
Button,
} from "@mui/material";

export default function ProductForm({ initialValues = {}, onSubmit }) {
const [values, setValues] = useState({
    name: initialValues.name || "",
    sku: initialValues.sku || "",
    stock: initialValues.stock ?? "",
    brand: initialValues.brand || "",
    price: initialValues.price ?? "",
});
const [errors, setErrors] = useState({});

const marcas = ["Marca A", "Marca B", "Marca C"];

const handleChange = (key) => (e) => {
    const v = key === "stock" ? e.target.value.replace(/\D/g, "") : e.target.value;
    setValues((s) => ({ ...s, [key]: v }));
    setErrors((s) => ({ ...s, [key]: "" }));
};

const validate = () => {
    const err = {};
    if (!values.name.trim()) err.name = "Nombre requerido";
    if (!values.sku.trim()) err.sku = "SKU requerido";
    if (values.stock === "" || Number(values.stock) < 0) err.stock = "Stock inválido";
    if (!values.brand) err.brand = "Marca requerida";
    setErrors(err);
    return Object.keys(err).length === 0;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (onSubmit) onSubmit({ ...values, stock: Number(values.stock) });
    else console.log("Product:", { ...values, stock: Number(values.stock) });
};

return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, p: 2 }}>
        <Grid container spacing={2}>
            <Grid item size={6}>
                <TextField
                    label="Nombre"
                    value={values.name}
                    onChange={handleChange("name")}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    required
                />
            </Grid>

            <Grid item size={6} sm={6}>
                <TextField
                    label="SKU"
                    value={values.sku}
                    onChange={handleChange("sku")}
                    error={!!errors.sku}
                    helperText={errors.sku}
                    fullWidth
                    required
                />
            </Grid>

            <Grid item size={6} sm={6}>
                <TextField
                    label="Stock"
                    value={values.stock}
                    onChange={handleChange("stock")}
                    error={!!errors.stock}
                    helperText={errors.stock}
                    fullWidth
                    required
                    inputProps={{ inputMode: "numeric", pattern: "\\d*" }}
                />
            </Grid>

            <Grid item size={6} sm={6}>
                <FormControl fullWidth error={!!errors.marca} required>
                    <InputLabel id="marca-label">Marca</InputLabel>
                    <Select
                        fullWidth
                        labelId="marca-label"
                        value={values.brand}
                        label="Marca"
                        onChange={handleChange("brand")}
                    >
                        {marcas.map((m) => (
                            <MenuItem key={m} value={m}>
                                {m}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item size={12} sm={6}>
                <TextField
                    label="price"
                    value={values.stock}
                    onChange={handleChange("price")}
                    error={!!errors.price}
                    helperText={errors.price}
                    fullWidth
                    required
                    inputProps={{ inputMode: "numeric", pattern: "\\d*" }}
                />
            </Grid>

            <Grid item size={12} sm={6}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="submit" variant="contained">
                        Guardar
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </Box>
);
}