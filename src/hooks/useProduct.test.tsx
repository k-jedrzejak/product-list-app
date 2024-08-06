import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchProduct, updateProduct } from '../state/productSlice';
import { API_BASE_URL } from '../constants/constants';
import { useProduct } from './useProduct';

// Mocking useParams
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

// Mocking useAppDispatch and useAppSelector
jest.mock('../state/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

// Mocking fetchProduct and updateProduct
jest.mock('../state/productSlice', () => ({
  fetchProduct: jest.fn(),
  updateProduct: jest.fn(),
}));

describe('useProduct', () => {
  const dispatchMock = jest.fn();
  const productId = '123';
  const selectedProduct = {
    id: productId,
    name: 'Product Name',
    description: 'Product Description',
    number: '123456',
    images: [{ url: 'image1.jpg', name: 'Image 1' }],
  };
  const signal = new AbortController().signal;

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ productId });
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useAppSelector as unknown as jest.Mock).mockReturnValue({
      selectedProduct: null,
      loading: false,
      error: null,
    });
    (fetchProduct as jest.Mock).mockImplementation((url, id) => ({
      type: 'fetchProduct',
      payload: { url, id },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch product on mount if productId is provided', async () => {
    renderHook(() => useProduct());

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(fetchProduct(API_BASE_URL, productId, signal));
    }, { timeout: 2000 });
  });

  it('should set editableProduct based on selectedProduct', async () => {
    const { result, rerender } = renderHook(() => useProduct());

    // Simulate state change by mocking useAppSelector to return selectedProduct
    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce({
      selectedProduct,
      loading: false,
      error: null,
    });

    rerender();

    await waitFor(() => {
      expect(result.current.editableProduct).toEqual({
        name: selectedProduct.name,
        description: selectedProduct.description,
        number: selectedProduct.number,
        images: selectedProduct.images,
      });
    }, { timeout: 2000 });
  });

  it('should handle input change correctly', async () => {
    const { result } = renderHook(() => useProduct());

    const event = {
      target: { name: 'name', value: 'New Product Name' },
    };

    act(() => {
      result.current.handleInputChange(event as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.editableProduct.name).toBe('New Product Name');
  });

  it('should handle saving field correctly', async () => {
    (updateProduct as jest.Mock).mockReturnValue({ type: 'updateProduct' });

    // Simulate state change by mocking useAppSelector to return selectedProduct
    (useAppSelector as unknown as jest.Mock).mockReturnValueOnce({
      selectedProduct,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useProduct());

    await act(async () => {
      await result.current.handleSaveField('name');
    });

    expect(dispatchMock).toHaveBeenCalledWith(updateProduct(API_BASE_URL, {
      ...selectedProduct,
      name: 'New Product Name', 
    }));
  });


  it('should handle image error correctly', async () => {
    const { result } = renderHook(() => useProduct());

    act(() => {
      result.current.handleImageError(0);
    });

    expect(result.current.imageErrors[0]).toBe('Failed to load image');
  });
});
