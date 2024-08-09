import React, { useState, useMemo, useEffect } from 'react';
import './table.css';

interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  width?: number; // 每列的宽度，单位是像素
}

interface TableProps {
  columns: Column[];
  data: any[];
  defaultPageSize: number;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  defaultPageSize,
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // 左侧和右侧固定列数的状态
  const [fixedLeftColumns, setFixedLeftColumns] = useState(1);
  const [fixedRightColumns, setFixedRightColumns] = useState(0);

  // 计算固定列的位置信息
  const [leftPositions, setLeftPositions] = useState<number[]>([]);
  const [rightPositions, setRightPositions] = useState<number[]>([]);

  useEffect(() => {
    // 计算左侧固定列的位置
    let leftPos = 0;
    const leftPositions = columns.map((col, index) => {
      if (index < fixedLeftColumns) {
        const pos = leftPos;
        const th = document.getElementById(`th-${index}`);
        const width = th?.getBoundingClientRect().width
        leftPos += width || 0; // 累加当前列的宽度
        return pos;
      }
      return null;
    });

    // 计算右侧固定列的位置
    let rightPos = 0;
    const rightPositions = columns.map((col, index) => {
      if (index >= columns.length - fixedRightColumns) {
        const pos = rightPos;
        const th = document.getElementById(`th-${index}`);
        const width = th?.getBoundingClientRect().width  
        rightPos += width || 0; // 累加当前列的宽度
        return pos;
      }
      return null;
    }).reverse(); // 从右向左计算
    console.log(leftPositions)
    console.log(rightPositions)

    setLeftPositions(leftPositions);
    setRightPositions(rightPositions);
    console.log(fixedLeftColumns)
  }, [columns, fixedLeftColumns, fixedRightColumns]);

  const handleSort = (key: string) => {
    const direction = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(direction);
  };

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      if (a[sortKey!] < b[sortKey!]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortKey!] > b[sortKey!]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // 当页码大小改变时，重置到第一页
  };

  return (
    <div className="table-settings">
      <div className="column-settings">
        <label>
          左侧固定列数:
          <input
            type="number"
            value={fixedLeftColumns}
            onChange={(e) => setFixedLeftColumns(Number(e.target.value))}
            min={0}
            max={columns.length - fixedRightColumns}
          />
        </label>
        <label>
          右侧固定列数:
          <input
            type="number"
            value={fixedRightColumns}
            onChange={(e) => setFixedRightColumns(Number(e.target.value))}
            min={0}
            max={columns.length - fixedLeftColumns}
          />
        </label>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col, index) => {
                let className = '';
                let style: React.CSSProperties = {};
                let id = ''
                if (index < fixedLeftColumns) {
                  className += ' sticky-left';
                  style.left = `${leftPositions[index]}px`;
                }
                if (index >= columns.length - fixedRightColumns) {
                  className += ' sticky-right';
                  style.right = `${rightPositions[columns.length - 1 - index]}px`;
                }
                if (col.sortable) {
                  className += ' sortable';
                  if (sortKey === col.key) {
                    className += ` ${sortDirection}`;
                  }
                }
                id = 'th' + '-' + index
                return (
                  <th
                    key={col.key}
                    id={id}
                    className={className}
                    style={style}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    {col.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => {
                  let className = '';
                  let style: React.CSSProperties = {};
                  let id = ''
                  if (colIndex < fixedLeftColumns) {
                    className += ' sticky-left';
                    style.left = `${leftPositions[colIndex]}px`;
                  }
                  if (colIndex >= columns.length - fixedRightColumns) {
                    className += ' sticky-right';
                    style.right = `${rightPositions[columns.length - 1 - colIndex]}px`;
                  }
                  id = 'td' + '-' + colIndex
                  return (
                    <td id={id} key={col.key} className={className} style={style}>
                      {row[col.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        
      </div>
      <div className="pagination-controls">
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              上一页
            </button>
            <span>
              第 {currentPage} 页，共 {totalPages} 页
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              下一页
            </button>
          </div>
          <div className="page-size-selector">
            <label htmlFor="pageSize">每页显示:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
    </div>
  );
};

export default Table;
