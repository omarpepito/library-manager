import React, { useState } from "react";
import ProductForm from "./ProductForm"; // adjust path/name if needed

import {
Box,
Button,
Dialog,
DialogTitle,
DialogContent,
Divider,
Paper,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
Typography,
} from "@mui/material";

export default function ProductPage() {
const [open, setOpen] = useState(false);
const [products, setProducts] = useState([
    // example initial data, replace with real data/fetch
    { id: 1, name: "Book A", sku: "A-001", price: 9.99 },
    { id: 2, name: "Book B", sku: "B-002", price: 14.5 },
]);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

// expects ProductForm to call onSubmit(newProduct) or similar
const handleAddProduct = (newProduct) => {
    // if your form doesn't provide an id, create one
    const id = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts((prev) => [...prev, { id, ...newProduct }]);
    handleClose();
};

return (
    <Box p={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between" size={8} p ={2}>
            <Typography variant="h4">Product</Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Create
            </Button>
        </Box>

        <Divider p={12}/>

        <Box mt={3}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {products.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell>{p.id}</TableCell>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.sku}</TableCell>
                                <TableCell>${Number(p.price).toFixed(2)}</TableCell>
                                <TableCell>{p.brand}</TableCell>
                                <TableCell align="right">:</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Create Product</DialogTitle>
            <DialogContent>
            
                <ProductForm onSubmit={handleAddProduct} onCancel={handleClose} />
            </DialogContent>
        </Dialog>
    </Box>
);
}