import {HealthItem} from "../Models/HealthItem";
import {
    Card,
    HStack,
    Spacer,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Heading,
    Text,
    Button,
    Skeleton,
    useToast,
    Badge
} from '@chakra-ui/react'
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ItemAPI} from "../APIs/ItemAPI";
import * as React from "react";

interface Props {
    _item_id?: string | undefined
}


export const ItemCard = ({_item_id}: Props) => {

    let {item_id} = useParams();
    let final_item_id: string;

    if (_item_id) {
        final_item_id = _item_id
    } else {
        final_item_id = item_id!
    }

    const [item, setItem] = useState<HealthItem | undefined>(undefined);
    const toast = useToast()

    const get_item = () => {
        ItemAPI.get_item(final_item_id!).then((res) =>{
            setItem(res)
            console.log(res.label)
            console.log(res.quantity)
            if (item_id) {
                toast({
                    title: 'QR Code Scanned',
                    description: "We are searching for you.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })                
            }
        })
    }

    useEffect(() => {
        get_item()
    }, [])

    return (
        <>
            { item ?
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={item.url}
                        alt={item.url}
                    />

                    <Stack>
                        <CardBody>
                            <Heading size='md'>{item?.label}</Heading>

                            <Badge colorScheme={'purple'}>{"Quantity: " + item.quantity}</Badge>
                            <Text py='2'>
                                {item.description}
                            </Text>

                        </CardBody>

                        <CardFooter>
                            <HStack>
                                <Button
                                    bgGradient="linear(to-r, brand.300, brand.200)"
                                    color="white"
                                    variant="solid"
                                >
                                    Check out
                                </Button>
                                <Button
                                    bgGradient="linear(to-r, brand.200, brand.100)"
                                    color="white"
                                    variant="solid"
                                >
                                    Check in
                                </Button>
                            </HStack>
                        </CardFooter>
                    </Stack>
                </Card>
                :
                <Stack>
                    <Spacer/>
                    <HStack>
                        <Skeleton height='100px' width={"100%"}/>
                        <Skeleton height='100px' width={"100%"}/>
                    </HStack>
                    <Skeleton height='200px' width={"100%"}/>
                    <HStack>
                        <Skeleton height='100px' width={"100%"}/>
                        <Skeleton height='100px' width={"100%"}/>
                        <Skeleton height='100px' width={"100%"}/>
                    </HStack>
                    <Skeleton height='100px' width={"100%"}/>
                </Stack>
            }
        </>
    )
}