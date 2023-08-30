const QUERY = {
    SELECT_NUMBERS: 'SELECT * FROM numbers ORDER BY created_at DESC LIMIT 100',
    SELECT_NUMBER: 'SELECT * FROM numbers WHERE id = ?',
    CREATE_NUMBER: 'INSERT INTO numbers (name, number) VALUES (?, ?)',
    UPDATE_NUMBER: 'UPDATE numbers SET name = ?, number = ? WHERE id = ?',
    DELETE_NUMBER: 'DELETE FROM numbers WHERE id = ?'
};

export default QUERY;