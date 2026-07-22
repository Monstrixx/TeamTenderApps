import { useState } from 'react';
import { INITIAL_UPAH_LIST, INITIAL_BAHAN_LIST, INITIAL_ALAT_LIST, INITIAL_BOQ_LIST, INITIAL_AHSP_ITEMS } from '../../data/mock/workspace';
import { calculateBoqGrandTotal as calcBoqGrandTotal } from '../../modules/workspace/helpers/workspaceHelpers';

export function useWorkspaceRAB() {
    const [pricingStrategy, setPricingStrategy] = useState('original'); // 'original' | 'percent' | 'nominal'
    const [targetPercentage, setTargetPercentage] = useState(5); // % reduction
    const [targetNominal, setTargetNominal] = useState(2500000000.00); // Nominal target
    const [useLumpsumOverride, setUseLumpsumOverride] = useState(false);
    const [profitMargin, setProfitMargin] = useState(10); // Default 10%
    const [upahList, setUpahList] = useState(INITIAL_UPAH_LIST);
    const [bahanList, setBahanList] = useState(INITIAL_BAHAN_LIST);
    const [alatList, setAlatList] = useState(INITIAL_ALAT_LIST);
    const [boqList, setBoqList] = useState(INITIAL_BOQ_LIST);
    
    // AHSP is currently static in mock
    const ahspItems = INITIAL_AHSP_ITEMS;

    const getGrandTotal = () => calcBoqGrandTotal(boqList, ahspItems, upahList, bahanList, alatList, pricingStrategy, targetPercentage, useLumpsumOverride, targetNominal);

    return {
        pricingStrategy, setPricingStrategy,
        targetPercentage, setTargetPercentage,
        targetNominal, setTargetNominal,
        useLumpsumOverride, setUseLumpsumOverride,
        profitMargin, setProfitMargin,
        upahList, setUpahList,
        bahanList, setBahanList,
        alatList, setAlatList,
        boqList, setBoqList,
        actions: {
            getGrandTotal
        }
    };
}
