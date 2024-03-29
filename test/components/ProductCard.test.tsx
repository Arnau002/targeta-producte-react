import React from 'react';
import renderer from 'react-test-renderer';

import { ProductCard } from '../../src/components';
import { product2 } from '../data/products';

const { act } = renderer;

describe('Tests <ProductCard />', () => { 
    test('Mostra correctament el component', () => { 
                
        const wrapper = renderer.create(
            <ProductCard product={ product2 }>
                {
                    () => (
                        <h1>Product Card</h1>
                    )
                }
            </ProductCard>
        )

        expect( wrapper.toJSON() ).toMatchSnapshot();
    });   

    test('Incrementa el comptador', () => { 
        const wrapper = renderer.create(
            <ProductCard product={ product2 }>
                {
                    ({ count, increaseBy }) => (
                        <>
                            <h1>Product Card</h1>
                            <span>{ count }</span>
                            <button onClick={ () => increaseBy(1)}/>
                        </>
                    )
                }
            </ProductCard>
        );

        let tree = wrapper.toJSON();
        expect( tree ).toMatchSnapshot();

        act(() => {
            (tree as any).children[2].props.onClick();
        })
        
        tree = wrapper.toJSON();
        expect( (tree as any).children[1].children[0] ).toBe('1');
     })
 });