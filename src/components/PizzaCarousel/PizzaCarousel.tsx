import { Box, IconButton, Slide, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { PizzaCard } from '../PizzaCard/PizzaCard';
import type { Pizza } from '../../interfaces/Pizza';
import type { OrderItem } from '../../interfaces/Order';

interface PizzaCarouselProps {
  pizzas: Pizza[];
  onAddItem: (item: OrderItem) => void;
}

export const PizzaCarousel = ({ pizzas, onAddItem }: PizzaCarouselProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const cardsPerPage = 4;
  const totalPositions = Math.max(pizzas.length, 1);

  useEffect(() => {
    setStartIndex((prev) => (pizzas.length === 0 ? 0 : prev % pizzas.length));
  }, [pizzas.length]);

  const getVisiblePizzas = (fromIndex: number) => {
    if (pizzas.length === 0) return [];
    const count = Math.min(cardsPerPage, pizzas.length);
    return Array.from({ length: count }, (_, i) => pizzas[(fromIndex + i) % pizzas.length]);
  };

  const handleNext = () => {
    if (pizzas.length === 0) return;
    setSlideDirection('left');
    setStartIndex((prev) => (prev - 1 + pizzas.length) % pizzas.length);
  };

  const handlePrevious = () => {
    if (pizzas.length === 0) return;
    setSlideDirection('right');
    setStartIndex((prev) => (prev + 1) % pizzas.length);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <IconButton
        onClick={handlePrevious}
        disabled={pizzas.length <= 1}
        sx={{ position: 'absolute', left: 0 }}
      >
        <IoChevronBackSharp />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          overflow: 'hidden',
          width: '100%',
          px: 6,
        }}
      >
        {Array.from({ length: totalPositions }, (_, index) => (
          <Box
            key={`position-${index}`}
            sx={{
              width: '100%',
              height: '100%',
              display: startIndex === index ? 'flex' : 'none',
              alignItems: 'stretch',
              justifyContent: 'center',
              py: 2,
            }}
          >
            <Slide direction={slideDirection} in={startIndex === index} mountOnEnter unmountOnExit>
              <Stack
                spacing={2}
                direction="row"
                sx={{
                  alignItems: 'stretch',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                {getVisiblePizzas(index).map((pizza, cardIndex) => (
                  <PizzaCard
                    key={`${pizza.id}-${cardIndex}`}
                    pizza={pizza}
                    onAddItem={onAddItem}
                  />
                ))}
              </Stack>
            </Slide>
          </Box>
        ))}
      </Box>
      <IconButton
        onClick={handleNext}
        disabled={pizzas.length <= 1}
        sx={{ position: 'absolute', right: 0 }}
      >
        <IoChevronForwardSharp />
      </IconButton>
    </Box>
  );
};
