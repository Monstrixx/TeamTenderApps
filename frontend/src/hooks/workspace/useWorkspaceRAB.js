import { useState } from 'react';
import { calculateBoqGrandTotal as calcBoqGrandTotal } from '../../modules/workspace/helpers/workspaceHelpers';
import { useUpahQuery, useBahanQuery, useAlatQuery, useBoqQuery, useAhspQuery } from '../queries/workspace/useExtendedQueries';

export function useWorkspaceRAB(workspaceId = '12345') {
    const [pricingStrategy, setPricingStrategy] = useState('original'); // 'original' | 'percent' | 'nominal'
    const [targetPercentage, setTargetPercentage] = useState(5); // % reduction
    const [targetNominal, setTargetNominal] = useState(2500000000.00); // Nominal target
    const [useLumpsumOverride, setUseLumpsumOverride] = useState(false);
    const [profitMargin, setProfitMargin] = useState(10); // Default 10%
    const { data: upahData } = useUpahQuery(workspaceId);
    const { data: bahanData } = useBahanQuery(workspaceId);
    const { data: alatData } = useAlatQuery(workspaceId);
    const { data: boqData } = useBoqQuery(workspaceId);
    const { data: ahspData } = useAhspQuery(workspaceId);
    
    const upahList = upahData || [];
    const setUpahList = () => { console.warn('setUpahList is deprecated. Use mutations instead.'); };
    
    const bahanList = bahanData || [];
    const setBahanList = () => { console.warn('setBahanList is deprecated. Use mutations instead.'); };
    
    const alatList = alatData || [];
    const setAlatList = () => { console.warn('setAlatList is deprecated. Use mutations instead.'); };
    
    const boqList = boqData || [];
    const setBoqList = () => { console.warn('setBoqList is deprecated. Use mutations instead.'); };
    
    const ahspItems = ahspData || [];

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
