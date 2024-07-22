import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

const initialTransactions = [
  { id: 1, date: "2023-03-15", amount: 250, type: "Expense", category: "Nike" },
  { id: 2, date: "2023-03-20", amount: 300, type: "Income", category: "Adidas" },
  { id: 3, date: "2023-03-25", amount: 180, type: "Expense", category: "Jordan" },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    amount: "",
    type: "",
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setTransactions(
        transactions.map((t) => (t.id === editingId ? { ...newTransaction, id: editingId } : t))
      );
      setEditingId(null);
    } else {
      setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
    }
    setNewTransaction({ date: "", amount: "", type: "", category: "" });
  };

  const handleEdit = (transaction) => {
    setNewTransaction(transaction);
    setEditingId(transaction.id);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sneaker Transactions</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-4">
          <Input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            className="w-full sm:w-auto"
            required
          />
          <Input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            className="w-full sm:w-auto"
            required
          />
          <Select name="type" onValueChange={(value) => handleSelectChange("type", value)} required>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select name="category" onValueChange={(value) => handleSelectChange("category", value)} required>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nike">Nike</SelectItem>
              <SelectItem value="Adidas">Adidas</SelectItem>
              <SelectItem value="Jordan">Jordan</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">{editingId ? "Update" : "Add"} Transaction</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{format(new Date(transaction.date), "MM/dd/yyyy")}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(transaction)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(transaction.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;